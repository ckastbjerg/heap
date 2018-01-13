import React from 'react';
import Grid, { Row, Col } from '../composers/Grid';
import { Tabs, Page } from '../composers/Module';

import Shows from '../components/Shows';

import withTabs, { Tab } from './withTabs';

const ShowsPage = ({ tab, onTabChange }) => (
  <Page>
    <Grid>
      <Row>
        <Col isVisible={!tab || tab === 'latest'}>
          <Shows media="shows" filter="latest" />
        </Col>
        <Col isVisible={tab === 'upcoming'}>
          <Shows media="shows" filter="upcoming" />
        </Col>
        <Col isVisible={tab === 'awaited'}>
          <Shows media="shows" filter="awaited" />
        </Col>
        <Col isVisible={tab === 'pinned'}>
          <Shows media="shows" filter="pinned" />
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

export default withTabs(ShowsPage);
