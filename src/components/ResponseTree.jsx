import React from "react";
import { Box, Text, Icon } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

const ResponseTree = ({ responses }) => {
  const renderTree = (parentId) => {
    return responses
      .filter((r) => r.parent === parentId)
      .map((response) => (
        <Box key={response.id} ml={4} pl={4} borderLeft="1px" borderColor="gray.200">
          <Box display="flex" alignItems="center" mt={2}>
            <Icon as={FaArrowRight} mr={2} />
            <Text>
              <strong>ID:</strong> {response.id} - {response.text}
            </Text>
          </Box>
          {renderTree(response.id)}
        </Box>
      ));
  };

  return <Box>{renderTree(null)}</Box>;
};

export default ResponseTree;
