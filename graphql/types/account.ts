import { extendType, objectType } from 'nexus';

export const Account = objectType({
  name: 'Account',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('userId');
    t.nonNull.string('type');
    t.nonNull.string('provider');
    t.nonNull.string('providerAccountId');
    t.string('refresh_token');
    t.string('access_token');
    t.int('expires_at');
    t.string('token_type');
    t.string('scope');
    t.string('id_token');
    t.string('session_state');
    t.string('oauth_token_secret');
    t.string('oauth_token');
  },
});

export const AccountsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('accounts', {
      type: 'Account',
      authorize: (root, args, ctx) => ctx.authGuard(),
      resolve(_parent, _args, ctx) {
        return ctx.prisma.account.findMany();
      },
    });
  },
});
