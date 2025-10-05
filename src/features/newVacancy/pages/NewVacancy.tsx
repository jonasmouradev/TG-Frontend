import Container from '@/shared/components/container';
import Form from '../components/Form';

const NewVacancy = () => {
  return (
    <div className="m-4">
      <h1 className="text-xl font-semibold mb-2">Criar um novo processo seletivo</h1>
      <h2 className="text-lg mb-1">1. Informações da Vaga</h2>
      <Container>
        <Form>
          <Form.Field title="Cargo/Posição" placeholder="Cargo/Posição" />
          <Form.Field title="Área/Departamento" placeholder="Área/Departamento" />
          <Form.Field title="Nível" placeholder="Nível" />
          <Form.Field title="Modelo de Trabalho" placeholder="Modelo de Trabalho" />
          <Form.Field title="Localização" placeholder="Localização" />
          <Form.Button text="Próximo" />
        </Form>
      </Container>
    </div>
  );
};

export default NewVacancy;
