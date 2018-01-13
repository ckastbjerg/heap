import React from 'react';
import Grid, { Row, Col } from '../composers/Grid';
import { Tabs, Page } from '../composers/Module';

import Games from '../components/Games';

import withTabs, { Tab } from './withTabs';

const GamesPage = ({ tab, onTabChange }) => (
  <Page>
    <Grid>
      <Row>
        <Col isVisible={!tab || tab === 'latest'}>
          <Games media="games" filter="latest" />
        </Col>
        <Col isVisible={tab === 'upcoming'}>
          <Games media="games" filter="upcoming" />
        </Col>
        <Col isVisible={tab === 'awaited'}>
          <Games media="games" filter="awaited" />
        </Col>
        <Col isVisible={tab === 'pinned'}>
          <Games media="games" filter="pinned" />
        </Col>
      </Row>
    </Grid>
    <Tabs>
      <Tab name="latest" tab={tab || 'latest'} onClick={onTabChange}>
        Latest
      </Tab>
      <Tab name="upcoming" tab={tab} onClick={onTabChange}>
        Upcoming
      </Tab>
      <Tab name="awaited" tab={tab} onClick={onTabChange}>
        Awaited
      </Tab>
      <Tab name="pinned" tab={tab} onClick={onTabChange}>
        Pinned
      </Tab>
    </Tabs>
  </Page>
);

export default withTabs(GamesPage);
