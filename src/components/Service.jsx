// src/components/ServiceGrid.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie, faWifi, faTv, faPeopleGroup, faCreditCard, faSatelliteDish,
  faCarCrash, faGraduationCap, faBolt, faChargingStation, faRoad, faFire,
  faBuilding, faShieldHalved, faPhone, faMoneyBillWave, faGasPump,
  faMobileScreenButton, faLandmark, faFileInvoice, faUser, faTrain,
  faPlug, faDroplet, faIndianRupeeSign, faHouse, faRotate, 
  faHandHoldingDollar, faReceipt,
} from "@fortawesome/free-solid-svg-icons";

import { ModalProvider,useModal } from "../contexts/ServicesModalContext";
import { ServiceSelectionModal, DetailsModalComponent, TxnConfirmModal, TxnFormModal } from "./ServicesModal";
import placeholderImg from "../images/logo.png";

// --- Services List ---
const servicesList = [
  { icon: faUserTie, label: "Agent Collection" },
  { icon: faWifi, label: "Broadband Postpaid" },
  { icon: faTv, label: "Cable TV" },
  { icon: faPeopleGroup, label: "Clubs and Associations" },
  { icon: faCreditCard, label: "Credit Card" },
  { icon: faHandHoldingDollar, label: "Donation" },
  { icon: faSatelliteDish, label: "DTH" },
  { icon: faCarCrash, label: "eChallan" },
  { icon: faGraduationCap, label: "Education Fees" },
  { icon: faBolt, label: "Electricity" },
  { icon: faChargingStation, label: "EV Recharge" },
  { icon: faRoad, label: "Fastag" },
  { icon: faFire, label: "Gas" },
  { icon: faBuilding, label: "Housing Society" },
  { icon: faShieldHalved, label: "Insurance" },
  { icon: faPhone, label: "Landline Postpaid" },
  { icon: faMoneyBillWave, label: "Loan Repayment" },
  { icon: faGasPump, label: "LPG Gas" },
  { icon: faReceipt, label: "Mobile Postpaid" },
  { icon: faMobileScreenButton, label: "Mobile Prepaid" },
  { icon: faLandmark, label: "Municipal Services" },
  { icon: faFileInvoice, label: "Municipal Taxes" },
  { icon: faUser, label: "National Pension System" },
  { icon: faTrain, label: "NCMC Recharge" },
  { icon: faPlug, label: "Prepaid Meter" },
  { icon: faIndianRupeeSign, label: "Recurring Deposit" },
  { icon: faHouse, label: "Rental" },
  { icon: faRotate, label: "Subscription" },
  { icon: faDroplet, label: "Water" },
];

// --- ServiceIcon Component ---
const ServiceIcon = ({ item }) => {
  const { openModal } = useModal();

  const handleClick = () => {
    // Open the Biller modal dynamically with the service data
    
    openModal("serviceSelecter", { service: item });
  };

  return (
    <li className="flex flex-col items-center p-2">
      <button
        onClick={handleClick}
        className="bg-linear-to-br from-blue-900 to-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
        aria-label={item.label}
      >
        <FontAwesomeIcon icon={item.icon} className="text-lg" />
      </button>
      <span className="mt-2 text-xs font-medium text-center">{item.label}</span>
    </li>
  );
};

// --- Main Grid and Modals Wrapper Component ---
const ServiceGridContent = () => {
  const { isModalOpen } = useModal();

  return (
    <div>
      <div className="flex justify-end px-6">
        <img src={placeholderImg} className="h-14"/>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-y-2 gap-x-2 w-full">
        {servicesList.map((item, index) => (
          <ServiceIcon key={index} item={item} />
        ))}
      </ul>

      {/* Dynamic Modals */}
      {isModalOpen("serviceSelecter") && <ServiceSelectionModal/>}
      {isModalOpen("details") && <DetailsModalComponent />}
      {isModalOpen("txnConfirm") && <TxnConfirmModal/>}
      {isModalOpen("txnForm") && <TxnFormModal/>}
    </div>
  );
};

// --- Main Export Component (Context Encapsulation) ---
export const ServiceGrid = () => {
  return (
    <ModalProvider>
      <ServiceGridContent />
    </ModalProvider>
  );
};