import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return {id: ctx.req.user.userId, email: ctx.req.user.email, role: ctx.req.user.role};
  }
)