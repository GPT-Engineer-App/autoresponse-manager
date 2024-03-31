import React, { useState } from "react";
import { Box, Heading, Text, Button, Input, Textarea, Select, Grid, GridItem, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit, FaArrowUp, FaArrowDown } from "react-icons/fa";

const INITIAL_RESPONSES = [
  { id: 1, text: "Hola! ¿En qué puedo ayudarte?", type: "text", parent: null, next: 2 },
  { id: 2, text: "Elige una opción:", type: "text", parent: 1, next: null },
  { id: 3, text: "1. Ver productos", type: "text", parent: 2, next: 4 },
  { id: 4, text: "Estos son nuestros productos:", type: "text", parent: 3, next: null },
  { id: 5, text: "https://mitienda.com/productos", type: "url", parent: 4, next: null },
  { id: 6, text: "2. Hablar con un agente", type: "text", parent: 2, next: 7 },
  { id: 7, text: "Redirigiendo a un agente...", type: "text", parent: 6, next: null },
  { id: 8, text: "3. Preguntas frecuentes", type: "text", parent: 2, next: 9 },
  { id: 9, text: "Elige una pregunta:", type: "text", parent: 8, next: null },
  { id: 10, text: "¿Cuál es el tiempo de entrega?", type: "text", parent: 9, next: 11 },
  { id: 11, text: "El tiempo de entrega es de 3-5 días hábiles", type: "text", parent: 10, next: null },
  { id: 12, text: "¿Tienen envío gratis?", type: "text", parent: 9, next: 13 },
  { id: 13, text: "Sí, en compras mayores a $500", type: "text", parent: 12, next: null },
  { id: 14, text: "4. Reiniciar", type: "text", parent: 2, next: 1 },
];

const AutoResponseManager = () => {
  const [responses, setResponses] = useState(INITIAL_RESPONSES);
  const [text, setText] = useState("");
  const [type, setType] = useState("text");
  const [parent, setParent] = useState("");
  const [next, setNext] = useState("");
  const [editingNext, setEditingNext] = useState(null);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parent && next && (parent === next || responses.find((r) => r.id === parseInt(next))?.parent === parent)) {
      toast({
        title: "Relación inválida",
        description: "La respuesta padre y siguiente no pueden formar un ciclo",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newResponse = {
      id: Math.max(...responses.map((r) => r.id)) + 1,
      text,
      type,
      parent: parent ? parseInt(parent) : null,
      next: next ? parseInt(next) : null,
    };
    setResponses([...responses, newResponse].sort((a, b) => a.id - b.id));
    setText("");
    setType("text");
    setParent("");
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
            {responses
              .sort((a, b) => a.id - b.id)
              .map((response, index) => (
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
                  <Text onClick={() => setEditingNext(response.id)}>
                    <strong>Siguiente:</strong>{" "}
                    {editingNext === response.id ? (
                      <Input
                        size="sm"
                        value={response.next || ""}
                        onChange={(e) => {
                          const next = e.target.value ? parseInt(e.target.value) : null;
                          setResponses(responses.map((r) => (r.id === response.id ? { ...r, next } : r)));
                        }}
                        onBlur={() => setEditingNext(null)}
                      />
                    ) : (
                      response.next || "N/A"
                    )}
                  </Text>
                  <Text>
                    <strong>Padre:</strong> {response.parent || "N/A"}
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
