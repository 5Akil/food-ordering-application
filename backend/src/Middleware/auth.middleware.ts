import { verify } from 'jsonwebtoken';
import { NestMiddleware, Injectable, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AccessTokenPayload } from '../Authentication/type/jwtPayload';
import { UserService } from 'src/User/service/user.service';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) { }

    async use(req: Request | any, res: Response, next: () => void) {
        const bearerHeader = req.headers.authorization;
        const accessToken = bearerHeader && bearerHeader.split(' ')[1];
        let user;
        if (!bearerHeader || !accessToken) {
            return next();
        }
        try {
            const { userId: id }: AccessTokenPayload = verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET,
            );
            user = await this.userService.findOneByID(id);
        } catch (error) {
            throw new ForbiddenException('Please register or sign in.');
        }
        if (user) {
            req.user = user;
        }
        next();
    }
}
