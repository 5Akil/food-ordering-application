import { Injectable } from "@nestjs/common";
import { UserRole } from "../dto/registerUser.dto";
import { AccessTokenPayload } from "../type/jwtPayload";
import { sign } from 'jsonwebtoken';






@Injectable()
export class AuthService {

    createAccessToken({ userId, isAdmin }: AccessTokenPayload): string {
       
        return sign({ userId, isAdmin }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '7d',
        });
    }
    assignTokens(userId: string, isAdmin: boolean ) {
        return {
            accessToken: this.createAccessToken({ userId, isAdmin }),
        };
    }
}