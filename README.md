# PandaPom

> A productivity timer that uses the Pomodoro technique

PandaPom is a Pomodoro timer that lets you set a goal for each day, and track your progress to that goal. It's built with Vue, Bulma, and Nuxt.

## Development

To start PandaPom locally, run 

```
yarn nuxt
```

## Deployment

To deploy the current HEAD of master to Github Pages, choose a version (eg `v0.5.2`) and run

```
./deploy.sh <version>
```

This will build the site and place the generated files in the `/docs` folder, commit those
changes, tag them with the version provided, and push everythin.

To deploy any version of PandaPom to `inseng`, check out that version and run

```
vaulted shell inseng
./deploy-inseng.sh
```

If you have no clue what `inseng` is, then you probably shouldn't deploy this way 🤷🏻‍