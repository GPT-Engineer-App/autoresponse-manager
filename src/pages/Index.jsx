import React, { useState } from "react";
import { Box, Heading, Text, Button, Input, Textarea, Select, Grid, GridItem, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit, FaArrowUp, FaArrowDown } from "react-icons/fa";

const INITIAL_RESPONSES = [
  { id: 1, text: "Hola! ¿En qué puedo ayudarte?", type: "text", next: 2 },
  { id: 2, text: "Elige una opción:", type: "text", next: null },
  { id: 3, text: "1. Ver productos", type: "text", next: 4 },
  { id: 4, text: "Estos son nuestros productos:", type: "text", next: null },
  { id: 5, text: "https://mitienda.com/productos", type: "url", next: null },
  { id: 6, text: "2. Hablar con un agente", type: "text", next: 7 },
  { id: 7, text: "Redirigiendo a un agente...", type: "text", next: null },
  { id: 8, text: "3. Preguntas frecuentes", type: "text", next: 9 },
  { id: 9, text: "Elige una pregunta:", type: "text", next: null },
  { id: 10, text: "¿Cuál es el tiempo de entrega?", type: "text", next: 11 },
  { id: 11, text: "El tiempo de entrega es de 3-5 días hábiles", type: "text", next: null },
  { id: 12, text: "¿Tienen envío gratis?", type: "text", next: 13 },
  { id: 13, text: "Sí, en compras mayores a $500", type: "text", next: null },
  { id: 14, text: "4. Reiniciar", type: "text", next: 1 },
];

const AutoResponseManager = () => {
  const [responses, setResponses] = useState(INITIAL_RESPONSES);
  const [text, setText] = useState("");
  const [type, setType] = useState("text");
  const [next, setNext] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newResponse = {
      id: Math.max(...responses.map((r) => r.id)) + 1,
      text,
      type,
      next: next ? parseInt(next) : null,
    };
    setResponses([...responses, newResponse]);
    setText("");
    setType("text");
    setNext("");
    toast({
      title: "Respuesta agregada",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDelete = (id) => {
    setResponses(responses.filter((r) => r.id !== id));
    toast({
      title: "Respuesta eliminada",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newResponses = [...responses];
    [newResponses[index], newResponses[index - 1]] = [newResponses[index - 1], newResponses[index]];
    setResponses(newResponses);
  };

  const handleMoveDown = (index) => {
    if (index === responses.length - 1) return;
    const newResponses = [...responses];
    [newResponses[index], newResponses[index + 1]] = [newResponses[index + 1], newResponses[index]];
    setResponses(newResponses);
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Gestor de Autorespuestas
      </Heading>
      <Grid templateColumns="1fr 1fr" gap={4}>
        <GridItem>
          <Box p={4} borderWidth={1} borderRadius="lg">
            <Heading as="h2" size="lg" mb={4}>
              Agregar Respuesta
            </Heading>
            <form onSubmit={handleSubmit}>
              <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Texto de la respuesta" mb={2} />
              <Select value={type} onChange={(e) => setType(e.target.value)} mb={2}>
                <option value="text">Texto</option>
                <option value="url">URL</option>
                <option value="reset">Reiniciar</option>
              </Select>
              <Input type="number" value={next} onChange={(e) => setNext(e.target.value)} placeholder="ID de siguiente respuesta" mb={4} />
              <Button type="submit" colorScheme="blue" leftIcon={<FaPlus />}>
                Agregar
              </Button>
            </form>
          </Box>
        </GridItem>
        <GridItem>
          <Box p={4} borderWidth={1} borderRadius="lg">
            <Heading as="h2" size="lg" mb={4}>
              Respuestas
            </Heading>
            {responses.map((response, index) => (
              <Box key={response.id} p={2} mb={2} borderWidth={1} borderRadius="md">
                <Text>
                  <strong>ID:</strong> {response.id}
                </Text>
                <Text>
                  <strong>Texto:</strong> {response.text}
                </Text>
                <Text>
                  <strong>Tipo:</strong> {response.type}
                </Text>
                <Text>
                  <strong>Siguiente:</strong> {response.next || "N/A"}
                </Text>
                <Button size="xs" colorScheme="red" leftIcon={<FaTrash />} onClick={() => handleDelete(response.id)} mr={2}>
                  Eliminar
                </Button>
                <Button size="xs" leftIcon={<FaArrowUp />} onClick={() => handleMoveUp(index)} mr={2}>
                  Subir
                </Button>
                <Button size="xs" leftIcon={<FaArrowDown />} onClick={() => handleMoveDown(index)}>
                  Bajar
                </Button>
              </Box>
            ))}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AutoResponseManager;
