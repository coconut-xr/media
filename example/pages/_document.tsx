import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  /*static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }*/

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

//this.props.__NEXT_DATA__.query.locale as string
