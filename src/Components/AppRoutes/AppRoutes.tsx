import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "../../Pages/Dashboard/DashboardPage";
import PendaftaranPage from "../../Pages/Pendaftaran/PendaftaranPage";
import PermohonanPage from "../../Pages/Permohonan/PermohonanPage";
import LaporanPage from "../../Pages/Laporan/LaporanPage";
import MasterData from "../../Pages/MasterData/MasterDataPage";
import BankSoal from "../../Pages/BankSoal/BankSoalPage";
import MatrixUji from "../../Pages/MatrixUjiKompetensi/MatrixUjiPage";
import AgendaTable from "../../Pages/Agenda/AgendaTable";
import ParticipantTable from "../../Pages/Partisipan/ParticipantTable";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />}></Route>
      <Route path="/pendaftaran" element={<PendaftaranPage />}></Route>
      <Route path="/permohonan" element={<PermohonanPage />}></Route>
      <Route path="/laporan" element={<LaporanPage />}></Route>
      <Route path="/masterData" element={<MasterData />}></Route>
      <Route path="/bankSoal" element={<BankSoal />}></Route>
      <Route path="/matrixUji" element={<MatrixUji />}></Route>
      <Route path="/agenda" element={<AgendaTable />} />
      <Route path="/partisipan/:id" element={<ParticipantTable />}></Route>
    </Routes>
  );
}

export default AppRoutes;
