import { CasesState } from '../../constants/types';

const CasesCard = ({ cases, totalCasesCount }: CasesState) => {
  const openCases = cases.filter((caseType) => caseType.status === 'Open');
  const closedCases = cases.filter((caseType) => caseType.status === 'Closed');

  return (
    <div className="q-stat flex flex-col lg:ml-0 slg:ml-0 mlg:ml-20  md:ml-[300px] lg:flex-row justify-evenly lg:items-center slg:items-center mlg:items-center gap-4 md:gap-0">
      <div className="lg:w-[99.3%] h-[300px] clg:w-[50vw] slg:w-[30vw] flex flex-col gap-2 md:content-start md:ml-[-300px] lg:ml-0 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary">
        <div className="flex flex-col clg:flex-col text-start justify-center items-start gap-4 ">
          <div className="flex gap-2 justify-center items-center">
            <div className="text-white md:text-[12px] lg:text-[15px] font-bold italic">
              Total cases
            </div>
            <div className="text-white font-bold italic text-xl border rounded-full h-[40px] w-[40px] items-center justify-center flex">
              {totalCasesCount ? totalCasesCount : 0}
            </div>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <div className="text-white md:text-[12px] lg:text-[15px] font-bold italic">
              Open cases
            </div>
            <div className="text-white font-bold italic text-xl border rounded-full h-[40px] w-[40px] items-center justify-center flex">
              {openCases.length ? openCases.length : 0}
            </div>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <div className="text-white md:text-[12px] lg:text-[15px] font-bold italic">
              Closed cases
            </div>
            <div className="text-white font-bold italic text-xl border rounded-full h-[40px] w-[40px] items-center justify-center flex">
              {closedCases ? closedCases.length : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasesCard;
