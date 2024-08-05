import { Paper, Typography } from '@mui/material';
import { Paragraph } from './components';

export const ExamplePage = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h2" gutterBottom>
        Example page
      </Typography>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet magna fringilla, egestas libero ac,
        egestas orci. Aenean lobortis molestie nisl in convallis. Nulla pellentesque in libero sit amet faucibus. Morbi
        nunc ipsum, ultrices at felis vitae, suscipit sagittis sapien. Donec quam nunc, dignissim eget augue eget,
        ornare ultricies lorem. Fusce vitae turpis sapien. Vivamus commodo lobortis iaculis. Nullam eget est ipsum.
      </Paragraph>
      <Paragraph>
        Vestibulum tincidunt ut mi vitae dictum. Sed lobortis, arcu vel posuere porttitor, leo lacus maximus erat, in
        tempus neque lacus a enim. Donec consectetur quam a libero feugiat convallis. Phasellus accumsan posuere nisl,
        vel tempor urna malesuada in. Integer efficitur gravida ex porta imperdiet. Ut et felis sed nibh luctus ultrices
        a ac enim. Duis viverra arcu nisl, vel malesuada mi vehicula eu. Donec hendrerit convallis mauris, vel consequat
        justo tincidunt ut. Etiam non molestie ipsum, sed consectetur nibh.
      </Paragraph>
      <Paragraph>
        Sed vel tellus facilisis, bibendum ante feugiat, efficitur libero. Proin imperdiet diam ac arcu porttitor
        ullamcorper. Donec ut aliquet enim, id placerat erat. Class aptent taciti sociosqu ad litora torquent per
        conubia nostra, per inceptos himenaeos. Curabitur luctus vehicula fringilla. Suspendisse erat risus, efficitur
        eget facilisis et, feugiat quis nisi. Nam scelerisque consectetur sapien. Nullam nec velit sodales augue
        molestie luctus.
      </Paragraph>
      <Paragraph>
        In ac laoreet nulla. Duis pellentesque, est eu aliquet faucibus, elit enim consequat odio, at venenatis odio
        tortor at quam. Nullam facilisis commodo risus ut auctor. Maecenas facilisis sodales massa, eu suscipit felis
        aliquet a. Donec non fringilla eros. Fusce in mauris tellus. Maecenas nec odio non odio cursus sagittis.
        Suspendisse luctus faucibus lectus, eget accumsan urna mattis faucibus. Ut ullamcorper laoreet dui nec
        venenatis. Nam accumsan ac sem ut auctor. Cras blandit justo nulla. Pellentesque laoreet risus diam, semper
        placerat felis rhoncus at.
      </Paragraph>
      <Paragraph>
        Maecenas lacinia, elit a ornare pellentesque, risus diam accumsan orci, aliquam placerat dolor ligula in massa.
        Aenean feugiat dapibus sem ac mattis. Mauris sagittis faucibus odio rhoncus facilisis. Integer vitae dolor
        faucibus sem ornare ullamcorper. Aliquam erat volutpat. Aliquam suscipit ut ligula vitae efficitur. Sed ac
        efficitur diam, eu accumsan justo. Cras massa odio, sodales eget diam quis, consectetur bibendum neque. Integer
        rutrum et dui vel laoreet. Ut auctor feugiat nunc. Donec at ipsum a urna varius rutrum. Donec a augue in dolor
        dictum luctus ut vel magna. Nullam tellus metus, dictum at libero eu, lobortis luctus massa. Phasellus dapibus
        elit eu faucibus laoreet. Nunc ante urna, blandit ac viverra id, dictum ac enim.{' '}
      </Paragraph>
    </Paper>
  );
};
