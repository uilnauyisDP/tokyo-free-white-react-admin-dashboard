import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Box, Container, Grid, Typography } from '@mui/material';
import Footer from 'src/components/Footer';
import { PokemonData } from 'src/data/PokemonData';

import AccountBalance from './AccountBalance';
import Wallets from './Wallets';
import AccountSecurity from './AccountSecurity';
import WatchList from './WatchList';
import csv2Json from 'csvtojson';
import { useState } from 'react';
import { pokemonData } from '../../../data/PokemonData';
import { Sankey } from './Sankey';
import { string } from 'prop-types';
import { PieChart } from './PieChart';

function DashboardPokemon() {
  return (
    <>
      <Helmet>
        <title>Pokemon Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={4}>
            <Box>
              <Typography variant="h2">Sankey diagram</Typography>
              <hr></hr>
              <Typography variant="h5">
                A Sankey diagram showing the primary types of new Pokemons
                introduced in each generation
              </Typography>
              <Sankey pokemonData={pokemonData} width={300} height={700} />
            </Box>
          </Grid>
          <Grid item lg={8} xs={12}>
            <Box>
              <Typography variant="h2">Pie Chart</Typography>
              <hr></hr>
              <Typography variant="h5">
                A pie chart showing the count of the primary types of pokemons in all generations. 
              </Typography>
              <PieChart pokemonData={pokemonData} width={650} height={450} />
            </Box>
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardPokemon;
