import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../Components/DashboardNavbar';
import DeviceCard from '../Components/DeviceCard';
import ConfigModal from '../Components/ConfigModal';
import ViewModal from '../Components/ViewModal';
import DetailsModal from '../Components/DetailsModal';
import AddDeviceModal from '../Components/AddDeviceModal';
import ImportModal from '../Components/ImportModal';
import PasswordConfirmationModal from '../Components/PasswordConfirmationModal';

const Device = () => {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();
  const [modals, setModals] = useState({
    config: { isOpen: false, device: null },
    view: { isOpen: false, device: null },
    details: { isOpen: false, device: null },
    addDevice: { isOpen: false },
    import: { isOpen: false, device: null, importType: null },
    passwordConfirm: { isOpen: false, device: null }
  });

  // Default devices data
  const defaultDevices = [
    {
      id: 1,
      name: "GBI-SAR Station Alpha",
      type: "Ground Radar",
      status: "Online",
      importType: "CSV",
      tabs: ["Table", "Different Charts"],
      apiUrl: "https://api.rockfall.com/sar/alpha",
      method: "GET",
      lastUpdated: new Date().toISOString()
    },
    {
      id: 2,
      name: "LiDAR Scanner Beta",
      type: "Optical Scanner",
      status: "Online",
      importType: "LAS",
      tabs: ["3D View", "Table", "Different Charts"],
      apiUrl: "https://api.rockfall.com/lidar/beta",
      method: "POST",
      lastUpdated: new Date().toISOString()
    },
    {
      id: 3,
      name: "Inclinometer Gamma",
      type: "Subsurface Monitor",
      status: "Online",
      importType: "CSV",
      tabs: ["Table", "Different Charts"],
      apiUrl: "https://api.rockfall.com/inclinometer/gamma",
      method: "GET",
      lastUpdated: new Date().toISOString()
    },
    {
      id: 4,
      name: "Piezometer Delta",
      type: "Hydrological Monitor",
      status: "Online",
      importType: "CSV",
      tabs: ["Table", "Different Charts"],
      apiUrl: "https://api.rockfall.com/piezometer/delta",
      method: "GET",
      lastUpdated: new Date().toISOString()
    },
    {
      id: 5,
      name: "Weather Station Epsilon",
      type: "Environmental Monitor",
      status: "Online",
      importType: "CSV",
      tabs: ["Table", "Different Charts"],
      apiUrl: "https://api.rockfall.com/weather/epsilon",
      method: "GET",
      lastUpdated: new Date().toISOString()
    },
    {
      id: 6,
      name: "Geophone Array Zeta",
      type: "Seismic Monitor",
      status: "Online",
      importType: "CSV",
      tabs: ["Table", "Different Charts"],
      apiUrl: "https://api.rockfall.com/geophone/zeta",
      method: "POST",
      lastUpdated: new Date().toISOString()
    },
    {
      id: 7,
      name: "Drone Imagery Hub Eta",
      type: "Aerial Survey",
      status: "Online",
      importType: "Images",
      tabs: ["Processing", "Table", "Different Charts"],
      apiUrl: "https://api.rockfall.com/drone/eta",
      method: "PUT",
      lastUpdated: new Date().toISOString()
    }
  ];

  useEffect(() => {
    setDevices(defaultDevices);
  }, []);

  const openModal = (modalType, device = null, importType = null) => {
    setModals(prev => ({
      ...prev,
      [modalType]: { isOpen: true, device, importType }
    }));
  };

  const closeModal = (modalType) => {
    setModals(prev => ({
      ...prev,
      [modalType]: { isOpen: false, device: null, importType: null }
    }));
  };

  const handleImport = (device, importType) => {
    openModal('import', device, importType);
  };

  const handleDelete = (device) => {
    openModal('passwordConfirm', device);
  };

  const confirmDelete = (device) => {
    setDevices(prev => prev.filter(d => d.id !== device.id));
    closeModal('passwordConfirm');
  };

  const updateDeviceConfig = (deviceId, config) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, ...config, lastUpdated: new Date().toISOString() }
        : device
    ));
    closeModal('config');
  };

  const addNewDevice = (newDevice) => {
    const device = {
      ...newDevice,
      id: devices.length > 0 ? Math.max(...devices.map(d => d.id)) + 1 : 1,
      lastUpdated: new Date().toISOString()
    };
    setDevices(prev => [...prev, device]);
    closeModal('addDevice');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Device Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor and manage your rockfall prediction devices</p>
            </div>
            <button
              onClick={() => openModal('addDevice')}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Card
            </button>
          </div>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          {devices.map(device => (
            <DeviceCard
              key={device.id}
              device={device}
              onView={() => openModal('view', device)}
              onConfig={() => openModal('config', device)}
              onDetails={() => openModal('details', device)}
              onDelete={() => handleDelete(device)}
              onImport={(importType) => handleImport(device, importType)}
            />
          ))}
        </div>

        {devices.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No devices found</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first device</p>
            <button
              onClick={() => openModal('addDevice')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Add Device
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <ConfigModal
        isOpen={modals.config.isOpen}
        device={modals.config.device}
        onClose={() => closeModal('config')}
        onSave={updateDeviceConfig}
      />

      <ViewModal
        isOpen={modals.view.isOpen}
        device={modals.view.device}
        onClose={() => closeModal('view')}
      />

      <DetailsModal
        isOpen={modals.details.isOpen}
        device={modals.details.device}
        onClose={() => closeModal('details')}
      />

      <AddDeviceModal
        isOpen={modals.addDevice.isOpen}
        onClose={() => closeModal('addDevice')}
        onAdd={addNewDevice}
      />

      <ImportModal
        isOpen={modals.import.isOpen}
        device={modals.import.device}
        importType={modals.import.importType}
        onClose={() => closeModal('import')}
      />

      <PasswordConfirmationModal
        isOpen={modals.passwordConfirm.isOpen}
        deviceName={modals.passwordConfirm.device?.name}
        onClose={() => closeModal('passwordConfirm')}
        onConfirm={() => confirmDelete(modals.passwordConfirm.device)}
      />
    </div>
  );
};

export default Device;