/* eslint-disable react/prop-types */
import { Row } from "antd";
import pdfHeader from "../assets/pdfHeader.png";
import logo from "../assets/logo.png";
import sigOne from "../assets/sig_1.png";
import sigTwo from "../assets/sig_2.png";
import Barcode from "react-barcode";

const WorkPermitPDF = ({ printContentRef, printWorkPermit }) => {
  return (
    <div
      className={`bg-white min-h-screen text-black print-content-font relative`}
      id="printContent"
      ref={printContentRef}
    >
      {/* Watermark */}
      {[1, 2, 3]?.map((elem, ind) => {
        return (
          <div
            key={ind}
            className={`absolute ${
              elem === 1
                ? "top-[43vh]"
                : elem === 2
                ? "top-[140vh]"
                : elem === 3
                ? "top-[240vh]"
                : elem === 4
                ? "top-[340vh]"
                : "top-[440vh]"
            }  flex items-center justify-center pointer-events-none`}
          >
            <img src={logo} alt="" className="opacity-15 w-4/6 mx-auto" />
          </div>
        );
      })}

      <div className="mx-[60px] py-4 space-y-3 !text-[13px]">
        {/* Header */}
        <img src={pdfHeader} alt="Qualitex" className="w-full" />
        <Row justify="end">
          <Barcode
            // value={
            //   printWorkPermit?.barcodeText ||
            //   printWorkPermit?.tootajaTeave?.nimi
            // }
            value={`${printWorkPermit?.tootajaTeave?.nimi}`}
            // value={`${printWorkPermit?.tootajaTeave?.nimi} ${printWorkPermit?.lubaNr}`}
            displayValue={false}
            format="CODE39"
            width={1}
            height={50}
          />
          {/* <div
              style={{
                height: "auto",
                marginLeft: "auto",
                maxWidth: 120,
                width: "100%",
              }}
            >
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={
                  printWorkPermit?.barcodeText ||
                  `Hello, ${printWorkPermit?.tootajaTeave?.nimi}`
                }
                viewBox={`0 0 256 256`}
              />
            </div> */}
        </Row>

        {/* Sub header */}
        <div className="my-4">
          <strong>Tööloa Dokument</strong>
          <p>
            <strong>Luba nr:</strong> {printWorkPermit?.lubaNr}
          </p>
        </div>
        {/* Company data */}
        <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
          <strong>1. Tööandja Teave</strong>
          <div className="!pl-4 !ml-4">
            <ul className="list-disc !space-y-2">
              <li>
                <strong>Ettevõtte Nimi:</strong> QUALITEX AS
              </li>
              <li>
                <strong>Tunnusnumber:</strong> EE100129399
              </li>
              <li>
                <strong>Aadress:</strong> Pärnu maakond, Tori vald, Sindi linn,
                Pärnu mnt 50, 86703
              </li>
              <li>
                <strong>Kontaktisik:</strong> Kristi Täht
              </li>
              <li>
                <strong>Amet:</strong> Peadirektor (CEO)
              </li>
              <li>
                <strong>E-post:</strong> kristi@qualitext.eu
              </li>
              <li>
                <strong>Telefon:</strong> +372 5834 7790
              </li>
            </ul>
          </div>
        </div>
        {/* Employee data */}
        <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
          <strong>2. Töötaja Teave</strong>
          <div className="!pl-4 !ml-4">
            <ul className="list-disc !space-y-2">
              <li>
                <strong>Nimi:</strong> {printWorkPermit?.tootajaTeave?.nimi}
              </li>
              <li>
                <strong>Isa Nimi:</strong>{" "}
                {printWorkPermit?.tootajaTeave?.isaNimi}
              </li>
              <li>
                <strong>Emainimi:</strong>{" "}
                {printWorkPermit?.tootajaTeave?.emainimi}
              </li>
              <li>
                <strong>Sünnipäev:</strong>{" "}
                {printWorkPermit?.tootajaTeave?.sunnipaev}
              </li>
              <li>
                <strong>Passi Number:</strong>{" "}
                {printWorkPermit?.tootajaTeave?.passiNumber}
              </li>
              <li>
                <strong>Püsiv Aadress:</strong>{" "}
                {printWorkPermit?.tootajaTeave?.pusivAadress}
              </li>
              <li>
                <strong>E-post:</strong> {printWorkPermit?.tootajaTeave?.ePost}
              </li>
            </ul>
          </div>
        </div>
        {/* 3. Tööandmise Detailid */}
        <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
          <strong>3. Tööandmise Detailid</strong>

          <div className="!space-y-2">
            <p>
              {" "}
              <strong>Ametikoht:</strong> <br /> Õmblusmasinate Operaator
            </p>
            <p>
              <strong>Töö Kirjeldus</strong>:<br />
              {/* {printWorkPermit?.tooandmiseDetailid?.tooKirjeldus} */}
              Uzzal Mia töötab QUALITEX AS kuulub õmblusmasinate tõhus kasutamine, kvaliteedistandardite järgimine rõivatootmises,
kvaliteedikontrollide tegemine ja ohutusnõuete ning ettevõtte protokollide järgimine. Täiendavad
ülesanded võivad olla määratud vastavalt tööandja vajadustele. Uzzal Mia töötab QUALITEX AS
kuulub õmblusmasinate tõhus kasutamine, kvaliteedistandardite järgimine rõivatootmises,
kvaliteedikontrollide tegemine ja ohutusnõuete ning ettevõtte protokollide järgimine. Täiendavad
ülesanded võivad olla määratud vastavalt tööandja vajadustele. ning ettevõtte protokollide järgimine. Täiendavad
ülesanded võivad olla määratud vastavalt tööandja vajadustele. ning ettevõtte protokollide järgimine. Täiendavad
ülesanded võivad olla määratud vastavalt tööandja vajadustele.
 

            </p>
            <br />
            <br />
            <br />
            <br /> <br /> <br /> <br /> <br /> <br /> <br />
            <p>
              <strong>Lepinguperiood:</strong> <br /> Tööleping algab{" "}
              {printWorkPermit?.tooandmiseDetailid?.contractStartDate} ja lõpeb{" "}
              {printWorkPermit?.tooandmiseDetailid?.contractEndDate}. See
              periood hõlmab katseperioodi vastavalt ettevõtte poliitikale.
            </p>
            <p>
              <strong>Liitumise Kuupäev:</strong>:<br />
              {printWorkPermit?.tootajaTeave?.nimi} alustab tööd{" "}
              {printWorkPermit?.tooandmiseDetailid?.contractStartDate}.
            </p>
            <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
              <strong>Palk ja Kasu:</strong>
              <div className="!pl-4 !ml-4">
                <ul className="list-disc !space-y-2">
                  <li>
                    <strong>Kuu Palk:</strong>{" "}
                    {printWorkPermit?.tooandmiseDetailid?.palkJaKasu.kuuPalk}
                  </li>
                  <li>
                    <strong>Tervisekindlustus:</strong> Tööandja pakub
                    tervisekindlustust.
                  </li>
                  <li>
                    <strong>Majutus:</strong> Ettevõte pakub töötajale majutust
                    töölepingu kehtivuse ajal.
                  </li>
                </ul>
              </div>
            </div>
            <p>
              <strong>Tööaeg:</strong>
              <br /> Töötaja töötab 8 tundi päevas ja 6 päeva nädalas.
              Konkreetne tööaeg määratakse vastavalt QUALITEX AS-i
              töökorraldustele ja teatatakse töötajale tööleasumise ajal.
            </p>
          </div>
        </div>
        {/* 4. Tööloa Detailid */}
        <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
          <strong>4. Tööloa Detailid</strong>
          <br />

          <div className="!space-y-2">
            <p>
              {" "}
              <strong>Väljastamise Kuupäev:</strong> <br />
              Tööloa kehtivus algab{" "}
              {printWorkPermit?.tooloaDetailid?.workPermitStartDate}.
            </p>
            <p>
              {" "}
              <strong>Loo Tüüp:</strong> <br />
              See luba on Tööluba, mis lubab{" "}
              {printWorkPermit?.tootajaTeave?.nimi}
              seaduslikult töötada ja viibida Eestis määratud perioodi jooksul.
            </p>
            <p>
              {" "}
              <strong>Kehtivusaeg:</strong> <br />
              Tööloa kehtivus on{" "}
              {printWorkPermit?.tooloaDetailid?.workPermitStartDate} kuni{" "}
              {printWorkPermit?.tooloaDetailid?.workPermitEndDate}. See periood
              katab algse tööhõive faasi, eeldades, et kõik seaduslikud ja
              regulatiivsed nõuded on täidetud.
            </p>

            <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
              <strong>Tingimused:</strong>
              <div className="!pl-4 !ml-4">
                <ul className="list-disc !space-y-2">
                  <li>
                    Töötaja peab järgima kohalikke seadusi,
                    immigratsioonieeskirju ja ettevõtte poliitikaid.
                  </li>
                  <li>
                    Töötaja peab täitma oma tööülesandeid hoolikalt ja järgima
                    QUALITEX AS-i kehtestatud operatiivstandardeid.
                  </li>
                  <li>
                    Tööloa uuendamine ei ole vajalik, kuid tööleping tuleb enne{" "}
                    {printWorkPermit?.tooandmiseDetailid?.contractEndDate}{" "}
                    uuendada, et tagada katkematu tööhõive.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Tööandja Deklaratsioon */}
        <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
          <strong>5. Tööandja Deklaratsioon</strong>
          <br />

          <div className="!space-y-2">
            <p>
              Mina, Kristi Täht, QUALITEX AS-i peadirektor, kinnitan, et see
              tööloa dokument on väljastatud Uzzal Miale ametikohale
              Õmblusmasinate Operaator. See luba on väljastatud esitatud ja
              täpselt täidetud teabe alusel, järgides kohalikke tööõiguse ja
              immigratsioonieeskirju. QUALITEX AS on pühendunud töötaja vajalike
              toetuste, sealhulgas tervisekindlustuse ja majutuse, pakkumisele,
              nagu on määratud töölepingus.
            </p>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        {/* Signature */}
        <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
          <strong>Allkiri:</strong>
          <br />

          <div className="">
            <img src={sigOne} alt="signature" className="w-[125px] h-auto" />
            <img
              src={sigTwo}
              alt="signature two"
              className="w-[125px] h-auto -mt-[12px] ml-[10px]"
            />
          </div>
        </div>

        {/* 6. Märkused  */}
        <div className="overflow-x-auto !my-8 text-slate-800 font-normal !space-y-[6px] !text-left">
          <strong>6. Märkused</strong>
          <br />

          <div className="!space-y-2">
            <p>
              See tööloa dokument on kehtiv 01. augustist 2024 kuni 30.
              septembrini 2024. Töötaja peab järgima kõiki loa tingimusi.
              Tööleping lõpeb 30. oktoobril 2025, ja see tuleb enne määratud
              kuupäeva uuendada, et tagada katkematu tööhõive. Töötaja peaks
              olema teadlik kõigist täiendavatest nõuetest või regulatiivsetest
              muudatustest, mis võivad mõjutada tema tööhõive staatust.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkPermitPDF;
