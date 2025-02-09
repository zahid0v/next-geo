
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ActionAreaCard from './card';
import Container from '@mui/material/Container';

const Item = styled(Paper)(({ theme }) => ({
  height: '280px',
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const productData = [
    {
      id: 1,
      name: 'Heatmap',
      description: 'Heatmap featuring earthquakes from 9/8/2017 to 10/8/2017. ',
      price: 199.99,
      image: '/Capture.PNG',
      url: '/heatmap/'
    },
    {
      id: 2,
      name: 'Choropleth',
      description: 'Choropleth map dynamically showcasing the median household income by US-state in year 2015',
      price: 149.99,
      image: '/Capture2.PNG',
      url: '/geojson/'
    },
    {
      id: 3,
      name: 'Clusters',
      description: 'Display your points based data on a map',
      price: 89.99,
      image: '/Capture4.png',
      url: '/clusters/'
    },
    {
      id: 4,
      name: 'Informative Marker',
      description: 'Plug more informations to your map locations',
      price: 49.99,
      image: '/Capture5.png',
      url: '/advanced_marker/'
    },
    {
      id: 5,
      name: 'CAD Data',
      description: 'Display and navigate between Cad drawings on a map',
      price: 179.99,
      image: '/Capture3.png',
      url: '/advanced_marker/'
    }
  ];

export default function ResponsiveGrid() {
  return (
    
    <Container sx={{ 
        py: 4,  // Add vertical padding
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:'0px'
      }}>
      <Grid 
        container 
        spacing={{ xs: 2, md: 3 }} 
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
            width: '100%',
            margin: 0  // Remove default margin
          }}
                >
        {productData.map((product) => (
          <Grid 
            item 
            xs={2} 
            sm={4} 
            md={4} 
            key={product.id}
            sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch',
              }}
          >
            <Item>
              <ActionAreaCard 
                name={product.name}
                description={product.description}
                image={product.image}
                url={product.url}
              />
            </Item>
          </Grid>
        ))}
      </Grid>
      </Container>
  );
}