import React from 'react';
import Grid, { Row, Col } from '../composers/Grid';
import { Tabs, Page } from '../composers/Module';

import Movies from '../components/Movies';
import Shows from '../components/Shows';
import Games from '../components/Games';

import withTabs, { Tab } from './withTabs';

const Watch = ({ tab, onTabChange }) => (
  <Page>
    <Grid>
      <Row>
        <Col isVisible={!tab || tab === 'movies'}>
          <Movies media="movies" type="theatrical" filter="latest" />
        </Col>
        <Col isVisible={!tab || tab === 'movies'}>
          <Movies media="movies" type="digital" filter="latest" />
        </Col>
        <Col isVisible={tab === 'shows'} filter="latest">
          <Shows media="shows" filter="latest" />
        </Col>
        <Col isVisible={tab === 'games'} filter="latest">
          <Games media="games" filter="latest" />
        </Col>
      </Row>
    </Grid>
    <Tabs>
      <Tab name="Theatrical movies" tab={tab || 'movies'} onClick={onTabChange}>
        Movies
      </Tab>
      <Tab name="Digital movies" tab={tab} onClick={onTabChange}>
        Shows
      </Tab>
      <Tab name="Shows" tab={tab} onClick={onTabChange}>
        Games
      </Tab>
      <Tab name="Games" tab={tab} onClick={onTabChange}>
        Games
      </Tab>
    </Tabs>
  </Page>
);

export default withTabs(Watch);
