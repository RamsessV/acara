import React, { useState } from "react";

const faqs = [
  {
    pregunta: "¿Cómo realizo una compra?",
    respuesta: "Selecciona el modelo que te guste, elige color y personalizaciones, agrega al carrito, y finaliza la compra en WhatsApp siguiendo las instrucciones."
  },
  {
    pregunta: "¿Cómo agrego iniciales o personalización?",
    respuesta: "En la página del producto, activa la opción de iniciales, elige el tamaño y color de letra, y agrega al carrito."
  },
  {
    pregunta: "¿Cómo se calculan los costos de envío?",
    respuesta: "Los envíos son gratis si compras más de 2 productos. Para menos de 3 productos, el costo se muestra antes de finalizar la compra en WhatsApp."
  },
  {
    pregunta: "¿Cuánto tarda el envío?",
    respuesta: "Generalmente de 2 a 5 días hábiles, dependiendo de tu ubicación."
  },
  {
    pregunta: "¿Cómo pago?",
    respuesta: "El pago se realiza a través de WhatsApp al finalizar la compra, siguiendo las instrucciones que te enviamos. Aceptamos transferencias o pagos en efectivo dependiendo de tu ubicación."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container my-5 pt-4" style={{ maxWidth: 800 }}>
      <h2 className="mb-4 text-center fw-bold">Preguntas Frecuentes</h2>
      <div className="accordion" id="faqAccordion">
        {faqs.map((item, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading-${index}`}>
              <button
                className={`accordion-button ${openIndex !== index ? "collapsed" : ""}`}
                type="button"
                onClick={() => toggle(index)}
              >
                {item.pregunta}
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${openIndex === index ? "show" : ""}`}
            >
              <div className="accordion-body">
                {item.respuesta}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
