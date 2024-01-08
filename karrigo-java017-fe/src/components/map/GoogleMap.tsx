import { Box, Flex, SkeletonText, Text } from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState, useEffect } from "react";
import { Button } from "antd";
// import { setInterval } from "timers";

const center = { lat: 6.6378, lng: 5.92915 };
const googleMapsApiKey: string = process.env
  .REACT_APP_GOOGLE_MAPS_API_KEY as string;
const libraries: any = ["drawing", "places"];

interface CanFinish {
  onFinish(): void;
}

interface Props{
  hieght: string;
  width: string;
  classSpecification: string;
  borderRaduis: string;
}

const CustomMap = ({hieght, width, classSpecification, borderRaduis}: Props) => {
  useEffect(()=>{

    const interval = setInterval(()=>{
      if(undefined !==  globalThis.senderAddress  && undefined !==  globalThis.receiverAddress){
        calculateRoute();
        globalThis.distance = distance;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [globalThis.senderAddress]);

  const childRef: any = useRef<CanFinish>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });

  // const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [map, setMap]: any = useState();
  const [directionsResponse, setDirectionsResponse]: any = useState(null);
  const [distance, setDistance]: any = useState("");
  const [duration, setDuration]: any = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef: any = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef: any = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }


  // if (globalThis.getDistance) {
  //   calculateRoute();

  //   globalThis.distance = distance;
  //   globalThis.getDistance = false;
  // }

  async function calculateRoute() {
    if (globalThis.senderAddress === "" || globalThis.receiverAddress === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results: any = await directionsService.route({
      origin: globalThis.senderAddress,
      destination: globalThis.receiverAddress,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance?.text);
    setDuration(results.routes[0].legs[0].duration?.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    globalThis.senderAddress = "";
    globalThis.receiverAddress = "";
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="end"
      h="100vh"
      w="100vw"
      className={classSpecification}
      borderRadius={"30%"}
    >
      <Box position="relative" right={0} top={0} h={hieght} w={width}>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={10}
          mapContainerStyle={{ width: "100%", height: "100%" , borderRadius: borderRaduis}}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
    </Flex>
  );
};

export default CustomMap;
