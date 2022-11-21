CoinGate Homepage

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Deployment

- **_Stages_** - Deployable via pull request's comments `/preview [stage id]` e.g. `/preview stage1`. Multiple homepage previews can be attach to a single core stage.
- **_Production_** and **_Sandbox_** - Deployed on push to _master_.

## Infrastructure

- Homepage is deploy to [Vercel](https://vercel.com)
- Build logs are available in [GitHub workflow](https://github.com/coingate/homepage/actions)
- Live logs are available at [Datadog](https://app.datadoghq.com/logs)

## Learn More About Framework

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Multilanguage

Read more about multilanguage feature and basic usage on [multilanguage wiki page](https://github.com/coingate/homepage/wiki/Multilanguage)
