import React, { Component } from 'react';
import { Container, Header, Title, Content, 
        Footer, FooterTab, Button, Left, Right, 
        Body, Icon, Text, Tab, Tabs, TabHeading } from 'native-base';
import TabOne from '../screens/tabs/TabOne';
import TabTwo from '../screens/tabs/TabTwo';
import TabThree from '../screens/tabs/TabThree';
import TabFour from '../screens/tabs/TabFour';
import TabFive from '../screens/tabs/TabFive';
import TabSix from '../screens/tabs/TabSix';
export default class AnatomyExample extends Component {
  render() {
    return (
      <Container>
       <Header />
        <Content />
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="apps" />
              <Text>Apps</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical>
              <Icon name="navigate" />
              <Text>Navigate</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}