import React, { useState } from "react";
import { Box, Heading, Text, Image, Grid, Button, Flex, IconButton, Badge, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "This is a sample product",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwMXxlbnwwfHx8fDE3MTI5ODg2Mzl8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is another sample product",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwMnxlbnwwfHx8fDE3MTI5ODg2Mzl8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  // Add more products...
];

const Index = () => {
  const [cart, setCart] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" p={4} bg="gray.100">
        <Heading as="h1" size="xl">
          My Online Store
        </Heading>
        <IconButton icon={<FaShoppingCart />} aria-label="Cart" onClick={onOpen}>
          <Badge ml={2} colorScheme="red">
            {cart.length}
          </Badge>
        </IconButton>
      </Flex>

      <Grid templateColumns="repeat(3, 1fr)" gap={6} p={4}>
        {products.map((product) => (
          <Box key={product.id} borderWidth={1} borderRadius="lg" p={4}>
            <Image src={product.image} alt={product.name} mb={4} />
            <Heading as="h2" size="md" mb={2}>
              {product.name}
            </Heading>
            <Text mb={2}>{product.description}</Text>
            <Text fontWeight="bold" mb={4}>
              ${product.price}
            </Text>
            <Button colorScheme="blue" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </Box>
        ))}
      </Grid>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Shopping Cart</DrawerHeader>
          <DrawerBody>
            {cart.map((item) => (
              <Flex key={item.id} align="center" mb={4}>
                <Image src={item.image} alt={item.name} boxSize="64px" mr={4} />
                <Box>
                  <Heading as="h3" size="sm">
                    {item.name}
                  </Heading>
                  <Text fontWeight="bold">${item.price}</Text>
                </Box>
                <IconButton icon={<FaTrash />} aria-label="Remove" onClick={() => removeFromCart(item.id)} ml="auto" />
              </Flex>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Index;
