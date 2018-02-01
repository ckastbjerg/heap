import React from 'react';
import Grid, { Row, Col } from '../composers/Grid';
import { Tabs, Page } from '../composers/Module';

import Movies from '../components/Movies';

import withTabs, { Tab } from './withTabs';

const Watch = ({ tab, onTabChange }) => (
  <Page>
    <Grid>
      <Row>
        <Col isVisible={!tab || tab === 'movies'}>
          <Movies media="movies" type="digital" filter="latest" />
        </Col>
        <Col isVisible={tab === 'upcoming'}>
          <Movies media="movies" type="digital" filter="upcoming" />
        </Col>
        <Col isVisible={tab === 'watched'}>
          <Movies media="movies" type="digital" filter="archived" />
        </Col>
        <Col isVisible={tab === 'pinned'}>
          <Movies media="movies" type="digital" filter="pinned" />
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
      <Tab name="watched" tab={tab} onClick={onTabChange}>
        Watched
      </Tab>
      <Tab name="pinned" tab={tab} onClick={onTabChange}>
        Pinned
      </Tab>
    </Tabs>
  </Page>
);

export default withTabs(Watch);
