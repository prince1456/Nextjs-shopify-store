import { useRouter } from "next/router";
import { useState } from "react";
import { client } from "../../utils/shopify";
import { addProductToCart } from "../../utils/Cart";

import {
  List,
  Grid,
  Image,
  Header,
  Segment,
  Dropdown,
  Input,
} from "semantic-ui-react";
const ProductPage = (props) => {
  const [productQuantity, setProductQuantity] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState("");
  console.log(props.product);
  const {
    product: { images, title, descriptionHtml, id, variants },
  } = props;
  const addToCart = async () => {
    try {
      if (productQuantity < 1) return;
      const {
        product: { variants },
      } = props;
      console.log("Fired");
      const variantId = selectedVariant
        ? variants.find(({ title }) => title === selectedVariant).id
        : variants[0].id;
      addProductToCart([
        {
          variantId,
          quantity: Number(productQuantity),
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };
  const options = variants.map(({ id, title }) => ({
    key: id,
    value: title,
    text: title,
  }));
  return (
    <Grid centered container>
      <Grid.Row stackable padded centered>
        <Grid.Column mobile={16} tablet={10} computer={10}>
          <Grid.Row>
            <Image size="large" src={images[selectedImage].src} />
          </Grid.Row>
          <Grid.Row>
            <List horizontal animated divided>
              {images.map((image, index) => {
                return (
                  <List.Item
                    style={{ cursor: "pointer" }}
                    key={index}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image size="small" src={image.src} />
                  </List.Item>
                );
              })}
              {/* <Divider vertical>Or</Divider> */}
            </List>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column
          mobile={16}
          tablet={6}
          computer={6}
          style={{ marginTop: 50 }}
        >
          <Segment>
            <Header>{title}</Header>
            <Header as="h3">Size </Header>
            <Dropdown
              // placeholder="Select Friend"
              fluid
              selection
              defaultValue={options[0].value}
              onChange={(e, { value }) => setSelectedVariant(value)}
              options={options}
            />
            <Header as="h3">ADD to Cart </Header>
            <Input
              fluid
              action={{
                color: "teal",
                labelPosition: "left",
                icon: "cart",
                content: "Checkout",
                onClick: addToCart,
              }}
              type="number"
              onChange={(e, data) => setProductQuantity(data.value)}
              actionPosition="left"
              placeholder="Search..."
              defaultValue={productQuantity}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid text style={{ marginTop: 50 }}>
        <Header as="h3" textAlign="left">
          Product Description:
        </Header>
        <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      </Grid>
    </Grid>
  );
};

export async function getServerSideProps({ query }) {
  console.log(query.productId[0]);
  const product = await client.product.fetch(query.productId[0]);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }, // will be passed to the page component as props
  };
}
export default ProductPage;
