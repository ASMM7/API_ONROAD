import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RolUser } from 'src/users/const/rol_users';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor( private reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    
    
    const requiredRoles = this.reflector.getAllAndOverride<RolUser>(ROLES_KEY,[
      context.getHandler(),
      context.getClass()
    ])

    if(!requiredRoles){
      return true;
    
    }
    
    const {user} = context.switchToHttp().getRequest();
    return user.rol === requiredRoles

  }
}