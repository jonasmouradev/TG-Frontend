import Container from '@/shared/components/container';
import Form from '../components/Form';

const NewVacancy = () => {
  return (
    <Container>
      <Form>
        <Form.Field title="Cargo/Posição" placeholder="Cargo/Posição" />
        {/* <Form.Field title="Área/Departamento" placeholder="Área/Departamento" />
        <Form.Field title="Nível" placeholder="Nível" />
        <Form.Field title="Modelo de Trabalho" placeholder="Modelo de Trabalho" />
        <Form.Field title="Localização" placeholder="Localização" /> */}
        <Form.Button text="Próximo" />
      </Form>
    </Container>
  );
};

export default NewVacancy;
