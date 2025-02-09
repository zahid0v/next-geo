import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Link from 'next/link';

interface ActionAreaCardProps {
  name?: string; // Optional prop with a default value
  description?: string; // Optional prop with a default value
  image?: string; // Optional prop with a default value
  url?: string; // Optional prop with a default value
  onClick?: () => void; 
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({
  name = 'Default Title',
  description = 'Default description',
  image = '/api/placeholder/400/320',
  url="/",
}) => {
  return (
    <Link href={url}> 
      <Card sx={{ 
        maxWidth: 345, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        <CardActionArea 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'start' 
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={name}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default ActionAreaCard;