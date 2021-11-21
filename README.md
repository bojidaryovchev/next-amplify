 The idea behind this project is to provide a ready-to-use structure for production-ready serverless Next.js applications hosted in AWS. Let's start with some backstory..
 
 Several months ago AWS announced Next.js SSR apps support for AWS Amplify which made it really easy to deploy a Next.js application to AWS - you could always go with Vercel, but as you may have found out their plans are more expensive and restrictive. On the other hand, AWS has been around a lot longer so it is generally more mature and, if you search for the current top serverless platforms, AWS Lambda ranks as first.
 
 Following the [AWS Amplify Next.js docs](https://docs.amplify.aws/guides/hosting/nextjs/q/platform/js/), you will see that you get the support for both SSG/SSR apps, CI/CD out of the box, connection to a domain with just a few clicks with the proper certificates etc. and your API routes are getting mapped to Lambda functions.. Pretty neat!
 
 About the technologies we've chosen:
 
 - [NextAuth](https://next-auth.js.org/) - Authentication for Next.js apps that gives us a lot of social providers and various authentication mechanisms out of the box to make our lives easier (the reason we have decided **not** to use Cognito is because it supports just a few federated providers like Facebook, Google, Apple, but lacks support for a giant like Twitter)
 - [Prisma](https://www.prisma.io/) - Prisma is a next-generation Node.js and TypeScript ORM that provides type-safe database access. It currently supports PostgreSQL, MySQL, SQLite, SQL Server and MongoDB (we have chosen to use a PostgreSQL database). Prisma regards the ```schema.prisma``` file as a single source of truth and generates its database client based on that schema, along with all the defined models (so you don't have to write boilerplate types)
 - [GraphQL](https://graphql.org/) - GraphQL is a query language developed by Facebook that has different principles than REST with the main ideas being the transporting of just the necessary data over the network to save traffic and having a single endpoint
 - [GraphQL Nexus](https://nexusjs.org/) - GraphQL Nexus provides us with a type-safe code-first approach to build GraphQL schemas that is scalable and improves the overall developer experience. Combined with Prisma, it is so type-safe that if you have a non-nullable field in some of your models defined in your ```schema.prisma``` and you have forgotten to describe to Nexus that the field is indeed non-nullable you will get an indication of that, which is incredible

## Getting Started

In order to scaffold this project we have gone over the following steps:

1. we have created a Next.js application using ```npx create-next-app@latest --ts```
2. we have initialized AWS Amplify using ```npx amplify init``` and following the [AWS Amplify Next.js tutorial for SSG apps](https://docs.amplify.aws/guides/hosting/nextjs/q/platform/js/#adding-amplify-hosting-1)
3. we initialized Prisma using ```npx prisma init``` and we have added ```binaryTargets = ["native", "rhel-openssl-1.0.x"]``` under ```provider = "prisma-client-js"```
4. we have initialized NextAuth following the [NextAuth Prisma tutorial](https://next-auth.js.org/adapters/prisma) with the corresponding environment variables in the ```.env``` file (notice that this file is not present in our repository as it is intended to contain sensitive secrets)
5. we have added our environment variables in our **AWS account > AWS Amplify > our app > Environment variables**
6. we have modified our ```amplify.yml``` file found in our **AWS account > AWS Amplify > our app > Build settings** by adding ```- echo "VARIABLE=$VARIABLE" >> .env``` under
```
build:
  commands:
```
for each environment variable that we have in order for our environment variables to become accessible to our API routes (Lambdas)

7. we have added GraphQL Nexus following [this tutorial](https://www.prisma.io/blog/fullstack-nextjs-graphql-prisma-2-fwpc6ds155)

There is also a [YouTube video recording](https://www.youtube.com/watch?v=YvoyHgZWSFY) of the setup from scratch minus the GraphQL / GraphQL Nexus part. If you are going to watch the video, make sure to read the description as well.
