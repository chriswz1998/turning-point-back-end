import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context)
    }

    handleRequest(err: Error | null, user: never) {
        if (err || !user) {
            throw new UnauthorizedException('Expired user, Please Login first')
        }
        return user
    }
}
