import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// crea una funcion para exportar en pdf un screenshoot del componente
export async function exportComponentToPDF(element: HTMLElement, fileName ) {
    
   const options = {
      scale: 2, // Calidad aumentada
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: -window.scrollY, // Asegura que capturamos desde el top
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
      backgroundColor: '#000000ff'
    };

    html2canvas(element, options).then(canvas => {
      // Dimensiones del contenido
      const contentWidth = canvas.width;
      const contentHeight = canvas.height;
      
      // Tamaño de página A4 en pixels (considerando 96dpi)
      const a4Width = 794; // 210mm
      const a4Height = 800; // 297mm
      
      // Calcular relación de escalado
      const scale = Math.min(a4Width / contentWidth, a4Height / contentHeight);
      
      // Crear PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [a4Width, a4Height],
        compress: true
      });
      
      // Añadir imagen escalada para que quepa en una página
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        contentWidth * scale,
        contentHeight * scale
      );
      
      pdf.save(fileName);
    });
}

export function validatestring(repo) {
    return repo.toLowerCase().replace(/ /g, '_');
  }
  export const checker = ( questions,keywords ) => {
    for (let key in questions) {
         if (questions.hasOwnProperty(key)) {
           let value = questions[key];
           for (let i = 0; i < keywords.length; i++) {
             if (value.includes(keywords[i])) {
               value = value.replace(new RegExp(keywords[i], "gi"), "abcd");
             }
           }
           questions[key] = value;
         }
       }
       return questions
 }
 export function formSelector(formType: string) {
  if (typeof formType !== 'string') {
    return undefined; // o un valor por defecto
  }
  switch (formType.toLowerCase()) {
    case "sb":
      return "SB";
    case "pd":
      return "PD";
    case "ap":
      return "AP";
  }
}
export function exportData(obj) {
// crea una funcion para exportar en pdf un screenshoot ddel componente

}

export function campaignStatus(status,id) {

}