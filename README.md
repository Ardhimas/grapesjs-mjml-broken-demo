# grapesjs-mjml issue demo

This project outlines an issue where the grapesjs editor works in dev but not in prod.

## Initialize

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Scripts

### Start project in dev

```bash
yarn start
```
Navigate to `localhost:3003/builder` if it doesn't do so automatically, and you'll see:
![image](https://user-images.githubusercontent.com/5238654/69081855-7e19fa00-0a04-11ea-9286-305bafd3d7eb.png)
The builder is able to load and you are able to use it, there is a warning in the console for the `mjml` tag being unrecognized as a DOM element but it doesn't cause any issues.


### Build and deploy prod build to local web server

```bash
yarn serve
```
This time, you'll see:
![image](https://user-images.githubusercontent.com/5238654/69082034-e963cc00-0a04-11ea-8622-8217bcfab5ba.png)

## More

You can view full documentation on this framework on the [official website](https://pro.ant.design).
