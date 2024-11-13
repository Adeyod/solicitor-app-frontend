import { CardType, CaseType } from '../../constants/types';

const Card = ({
  totalCasesCount,
  totalWorkersCount,
  totalLawyersCount,
  totalClientsCount,
  cases,
}: CardType) => {
  const completedCases = cases.filter(
    (singleCase: CaseType) => singleCase.status === 'Completed'
  );

  return (
    <div className="smm:ml-16 mmg:pl-[20px] lg:pl-0 w-full lg:w-[100%] mlg:ml-20">
      <div className="q-stat w-[70%] flex flex-col lg:ml-0 slg:ml-0 mlg:ml-20  md:ml-[300px] lg:flex-row justify-evenly lg:items-center slg:items-center mlg:items-center min-w-[100%] gap-4 md:gap-0">
        <div className="lg:w-[33.3%] clg:w-[25%] slg:w-[30%] md:w-[60vw] h-[120px] flex flex-col gap-2 md:content-start md:ml-[-300px] lg:ml-0 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary">
          <div className="flex clg:flex-col gap-2 justify-center items-center ">
            <div className="border-4 clg:hidden border-[#FFF7E7] rounded-full bg-[#FFC453] p-2"></div>
            <div className="flex gap-2 justify-center self-start items-center">
              <div className="text-white md:text-[12px] lg:text-[15px] font-bold italic">
                Total Cases
              </div>
              <div className="text-white font-bold italic text-xl md:text-[12px] border px-2 rounded-lg items-center justify-center flex">
                {totalCasesCount ? totalCasesCount : 0}
              </div>
            </div>

            <div className="flex gap-2 justify-center items-center">
              <div className="text-white md:text-[12px] lg:text-[15px] font-bold italic">
                Completed Cases
              </div>
              <div className="text-white font-bold italic text-xl md:text-[12px] border px-2 rounded-lg items-center justify-center flex">
                {completedCases.length}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[33.3%] clg:w-[25%] slg:w-[30%] md:w-[60vw] h-[120px] flex flex-col gap-2 md:content-start md:ml-[-300px] lg:ml-0 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary">
          <div className="flex clg:flex-col gap-2 justify-center items-center ">
            <div className="border-4 clg:hidden border-[#FFF7E7] rounded-full bg-[#FFC453] p-2"></div>
            <div className="flex gap-2 justify-center items-center">
              <div className="text-white md:text-[12px] lg:text-[15px] font-bold italic">
                Total clients
              </div>
              <div className="text-white font-bold italic text-xl border rounded-full h-[40px] w-[40px] items-center justify-center flex">
                {totalClientsCount ? totalClientsCount : 0}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[33.3%] clg:w-[25%] slg:w-[30%] md:w-[60vw] h-[120px] flex flex-col gap-2 md:content-start md:ml-[-300px] lg:ml-0 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary">
          <div className="flex clg:flex-col gap-2 justify-center items-center ">
            <div className="border-4 clg:hidden border-[#FFF7E7] rounded-full bg-[#FFC453] p-2"></div>
            <div className="flex gap-2 justify-center items-center">
              <div className="text-white md:text-[12px] lg:text-[15px] font-bold italic">
                Total workers
              </div>

              <div className="text-white md:text-[15px] font-bold italic text-xl border rounded-full h-[40px] w-[40px] items-center justify-center flex">
                {totalWorkersCount ? totalWorkersCount : 0}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[33.3%] clg:w-[25%] slg:w-[30%] md:w-[60vw] h-[120px] flex flex-col gap-2 md:content-start md:ml-[-300px] lg:ml-0 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary">
          <div className="flex clg:flex-col gap-2 justify-center items-center ">
            <div className="border-4 clg:hidden border-[#FFF7E7] rounded-full bg-[#FFC453] p-2"></div>
            <div className="flex gap-2 justify-center items-center">
              <div className="text-white md:text-[12px] lg:text-[15px] font-bold italic">
                Lawyers
              </div>

              <div className="text-white md:text-[15px] font-bold italic text-xl border rounded-full h-[40px] w-[40px] items-center justify-center flex">
                {totalLawyersCount ? totalLawyersCount : 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
