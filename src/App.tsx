import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useWakeLock from "react-use-wake-lock";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function App() {
  const date = new Date();
  const { request } = useWakeLock();
  const fullScreen = useFullScreenHandle();

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
    <FullScreen handle={fullScreen}>
      <Flex w="100vw" h="100vh" justify="center" align="center">
        <Box
          as="h1"
          fontSize={["4xl", "7xl", "9xl"]}
          fontFamily="'Orbitron', serif"
          color="red.600"
          fontWeight="800"
          onClick={() => {
            fullScreen.enter();
          }}
        >
          {time}
        </Box>
      </Flex>
    </FullScreen>
  );
}

export default App;
