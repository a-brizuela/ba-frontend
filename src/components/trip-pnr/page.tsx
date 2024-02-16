import { useAppSelector } from "@/redux/hooks";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

const TripPnr = () => {
  const selectedTraveler = useAppSelector((state) => state.selectedTraveler);
  const pnr = useAppSelector((state) => state.pnr.data);
  let parsedPnr;
  
  console.log(selectedTraveler);
  console.log(pnr);
  const parseJson = (string: string) => {
    return JSON.parse(string);
  };

  if (selectedTraveler && selectedTraveler.firstName !== "") {
    console.log(selectedTraveler);
    parsedPnr = {
      ...pnr,
      contactInformation: parseJson(pnr.contactInformation),
      itinerary: parseJson(pnr.itinerary),
      remarks: parseJson(pnr.remarks),
      ticketing: parseJson(pnr.ticketing),
      travelAgency: parseJson(pnr.travelAgency),
      travelers: parseJson(pnr.travelers),
    };
    console.log(parsedPnr);
  }

  return (
    <div>
      {(selectedTraveler && selectedTraveler.firstName) && (
        <div style={{height: "100%"}}>
          <h2>
            {selectedTraveler.firstName + " " + selectedTraveler.lastName}'s
            Trip Details
          </h2>
          <Divider />
          <div>
            <h4>PNR/Booking Reference:</h4>
            {parsedPnr?.bookingReference}
          </div>
          <Divider />
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Travelers
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: "flex", gap: "1rem" }}>
                {parsedPnr?.travelers.map(
                  (traveler: {
                    firstName: string;
                    lastName: string;
                    passengerType: string;
                  }) => {
                    return (
                      <div style={{backgroundColor: "#F7F6FA", borderRadius: "12px", padding: "0 1rem"}}>
                        <p>
                          Full Name:{" "}
                          {traveler.firstName + " " + traveler.lastName}
                        </p>
                        <p>Passenger Type: {traveler.passengerType}</p>
                      </div>
                    );
                  }
                )}
              </div>
              <h4>Contact Information</h4>
              <p>Phone Number: {parsedPnr?.contactInformation.phone}</p>
              <p>E-mail: {parsedPnr?.contactInformation.email}</p>
              <h4>Remarks</h4>
              {parsedPnr?.remarks.map(
                (remark: { type: string; text: string }) => {
                  return (
                    <>
                      <p>Type: {remark.type}</p>
                      <p>Descriprion: {remark.text}</p>
                      <Divider />
                    </>
                  );
                }
              )}
            </AccordionDetails>
          </Accordion>
          <Divider />
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Itinerary
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: "flex", gap: "1rem" }}>
                {parsedPnr?.itinerary.map(
                  (segment: {
                    segment: {
                      departureAirport: string;
                      arrivalAirport: string;
                      departureTime: string;
                      arrivalTime: string;
                      flightNumber: string;
                      class: string;
                      airlineCode: string;
                    };
                  }) => {
                    return (
                      <div style={{backgroundColor: "#F7F6FA", borderRadius: "12px", padding: "0 1rem"}}>
                        <p>Flight Number: {segment.segment.flightNumber}</p>
                        <p>Class: {segment.segment.class}</p>
                        <p>Airline Code: {segment.segment.airlineCode}</p>
                        <p>
                          Departure Airport: {segment.segment.departureAirport}
                        </p>
                        <p>
                          Departure Time:{" "}
                          {new Date(
                            segment.segment.departureTime
                          ).toUTCString()}
                        </p>
                        <p>Arrival Airport: {segment.segment.arrivalAirport}</p>
                        <p>
                          Arrival Time:{" "}
                          {new Date(segment.segment.arrivalTime).toUTCString()}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </AccordionDetails>
          </Accordion>
          <Divider />
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Ticketing
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Issue Date:{" "}
                {new Date(parsedPnr?.ticketing.issueDate).toUTCString()}
              </p>
              <p>Status: {parsedPnr?.ticketing.status}</p>
              Ticket Numbers:{" "}
              {parsedPnr?.ticketing.ticketNumbers.map((ticket: string) => {
                return <p>-{ticket}</p>;
              })}
            </AccordionDetails>
          </Accordion>
          <Divider />
          <h4>Travel Agency</h4>
          <p>Name: {parsedPnr?.travelAgency.name}</p>
          <p>Contact: {parsedPnr?.travelAgency.contact}</p>
          <p>Agent ID: {parsedPnr?.travelAgency.agentID}</p>
        </div>
      )}
    </div>
  );
};

export default TripPnr;
