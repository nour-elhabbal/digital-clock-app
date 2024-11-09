import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useWakeLock from "react-use-wake-lock";

function App() {
  const date = new Date();
  const { request } = useWakeLock();

  const [time, setTime] = useState(
    `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`
  );

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds() + 1}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <Flex w="100vw" h="100vh" justify="center" align="center">
      <Box
        as="h1"
        fontSize="8xl"
        fontFamily="'Orbitron', serif"
        color="red.600"
        fontWeight="800"
      >
        {time}
      </Box>
    </Flex>
  );
}

export default App;
