import Head from "next/head";
import Link from 'next/link'
import PropTypes from "prop-types";
import React, { Component } from "react";
import { client } from "../utils/shopify";
import { createMedia } from "@artsy/fresnel";
import {
  Button,
  Popup,
  Container,
  Divider,
  Grid,
  Card,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="Imagine-a-Company"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em",
      }}
    />
    <Header
      as="h2"
      content="Do whatever you want when you want to."
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
      }}
    />
    <Button primary size="huge">
      Get Started
      <Icon name="right arrow" />
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

const Home = (props) =>
  console.log(props) || (
    <>
      <Segment
        inverted
        textAlign="center"
        style={{ minHeight: props.isMobile ? 300 : 700 }}
        vertical
      >
        <HomepageHeading mobile={props.isMobile} />
      </Segment>
      <Segment vertical style={{ padding: "2em" }}>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Header
              content="Best Sales Product"
              as="h2"
              style={{
                fontSize: props.isMobile ? "1.5em" : "1.7em",
                fontWeight: "normal",
              }}
            />
            <Card.Group itemsPerRow={props.isMobile ? 3 : 4}>
              {props.products?.map(
                (product) =>
                  console.log(product) || (
                    <Link key={product.id} href={`product/${product.id}`}>
                      <Card raised>
                        <Image src={product.images[0].src} wrapped ui={false} />
                        <Card.Content>
                          <Header sub>
                            <Popup
                              trigger={<div>{product.title}</div>}
                              content={product.title}
                              position="top left"
                            />
                          </Header>
                          <Card.Meta>Joined in 2016</Card.Meta>
                          <Card.Description>
                            Daniel is a comedian living in Nashville.
                          </Card.Description>
                        </Card.Content>
                      </Card>
                     </Link>
                  )
              )}
            </Card.Group>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
export default Home;

export const getServerSideProps = async (context) => {
  const products = await client.product.fetchAll();
  const infos = await client.shop.fetchInfo();
  const policies = await client.shop.fetchPolicies();

  return {
    props: {
      infos: JSON.parse(JSON.stringify(infos)),
      policies: JSON.parse(JSON.stringify(policies)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
