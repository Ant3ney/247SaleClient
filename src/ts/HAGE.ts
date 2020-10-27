import HAGE_BASE from "./hage/HAGE_BASE";
import HAGE3D from "./hage/HAGE3D";
import HAGE2D from "./hage/HAGE2D";

const useGPU: boolean = localStorage.getItem('senpa-mob:WebGL') === 'OK';
const HAGE: HAGE_BASE = useGPU ? new HAGE3D() : new HAGE2D();

export default HAGE;
