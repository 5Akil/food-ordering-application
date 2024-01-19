import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Iorder } from "../../Orders/types/order.interface";
import { Model } from "mongoose";
import OrderDto from "../dto/checkout.dto";
import { RegisterUserDto } from "../../Authentication/dto/registerUser.dto";
import Stripe from "stripe";
import { IMenu } from "../../Menu_Items/types/menu_items.interface";


@Injectable()

export class CheckoutService {
    private stripe;
    constructor(@InjectModel('Order') private OrderModel: Model<Iorder>,
        @InjectModel("MenuItem") private Menu_Item_Model: Model<IMenu>
    ) {
        this.stripe = new Stripe(process.env.STRIPE_SK, {
            apiVersion: '2023-10-16',
        });
    }
    async generateSession(user: RegisterUserDto, data: OrderDto) {
        const { email: userEmail } = user
        const { address, cartProducts } = data
        const orderDoc = await this.OrderModel.create({
            userEmail,
            ...address,
            cartProducts,
            paid: false,
        })
        const stripeLineItems = [];
        for (const cartProduct of cartProducts) {
            const productInfo = await this.Menu_Item_Model.findById(cartProduct._id);

            let productPrice = productInfo.basePrice;
            if (cartProduct.size) {
                const size = productInfo.sizes
                    .find(
                        size =>
                            size._id.toString() === cartProduct.size._id
                    );
                productPrice += size.price;
            }
            if (cartProduct.extras?.length > 0) {
                for (const cartProductExtraThing of cartProduct.extras) {
                    const productExtras = productInfo.extraIngredientPrices;
                    const extraThingInfo = productExtras
                        .find(extra => extra._id.toString() === cartProductExtraThing._id);
                    productPrice += extraThingInfo.price;
                }
            }
            const productName = cartProduct.name;
            stripeLineItems.push({
                quantity: 1,
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: productName,
                    },
                    unit_amount: Number(parseFloat((productPrice * 100).toFixed(2))),
                },
            });

        }
        const stripeSession = await this.stripe.checkout.sessions.create({
            line_items: stripeLineItems,
            mode: 'payment',
            customer_email: userEmail,
            success_url: process.env.NEXT_BASE_URL + 'orders/' + orderDoc._id + '?clear-cart=1',
            cancel_url: process.env.NEXT_BASE_URL + 'cart?canceled=1',
            metadata: { orderId: orderDoc._id.toString() },
            payment_intent_data: {
                metadata: { orderId: orderDoc._id },
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        display_name: 'Delivery fee',
                        type: 'fixed_amount',
                        fixed_amount: { amount: 500, currency: 'USD' },
                    },
                }
            ],
        });
        return stripeSession
    }
    async webhook(req) {
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            const signSecret = process.env.STRIPE_SIGN_SECRET;
            event = this.stripe.webhooks.constructEvent(req.rawBody, sig, signSecret);

        } catch (e) {
            throw new HttpException(e, HttpStatus.FORBIDDEN)
        }
        if (event.type === 'checkout.session.completed') {
            const orderId = event?.data?.object?.metadata?.orderId;
            const isPaid = event?.data?.object?.payment_status === 'paid';
            if (isPaid) {
                await this.OrderModel.findByIdAndUpdate({ _id: orderId }, { paid: true });
            }
        }
    }
}