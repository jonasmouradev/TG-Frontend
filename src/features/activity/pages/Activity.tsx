import Accordion from '@/shared/components/Accordion/Accordion';
import Container from '../components/Container';

const Activity = () => {
  return (
    <div className="flex flex-col w-full h-full p-4">
      <Container>
        <Accordion></Accordion>
      </Container>
      <Container>
        <div>
          <h1>Activity</h1>
          <p>This is the activity page.</p>
          <p>More content can go here.</p>
          <p>Feel free to customize this page.</p>
          <p>Enjoy building your application!</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Click Me</button>
        </div>
      </Container>
    </div>
  );
};

export default Activity;
