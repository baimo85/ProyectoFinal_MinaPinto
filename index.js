// Almacenamiento local
const storage = {
    // Guardar datos en el almacenamiento local
    saveData: (key, data) => {
      localStorage.setItem(key, JSON.stringify(data));
    },

    getData: (key) => {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
  };
 
  const fetchDataFromJSON = async () => {
    try {
      const response = await axios.get('data.json');
      return response.data;
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      return null;
    }
  };
  
  // DOM
  const renderData = (data) => {
    const container = document.getElementById('resultadoCuotas');
    container.innerHTML = ''; // Limpiar el contenedor
  
    if (!data) {
      container.innerHTML = '<p>Error al cargar los datos</p>';
      return;
    }
  
    data.forEach(item => {
      const element = document.createElement('div');
      element.classList.add('item');
      element.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      `;
      container.appendChild(element);
    });
  };
  
  // Cálculo
  const calcularCuota = (monto, cuotas, tasaInteresMensual) => {
    const tasaInteresDecimal = tasaInteresMensual / 100;
    const factor = Math.pow(1 + tasaInteresDecimal, cuotas);
    const cuota = (monto * tasaInteresDecimal * factor) / (factor - 1);
    return cuota.toFixed(2);
  };
  

  const handleSimulation = async () => {
    // Obtener el monto y las cuotas ingresadas por el usuario
    const monto = parseFloat(document.getElementById('montoInput').value);
    const cuotas = parseInt(document.getElementById('cuotasInput').value);
    const tasaInteresMensual = 0.2; // 0.2% mensual
  

    const cuotaMensual = calcularCuota(monto, cuotas, tasaInteresMensual);
  
 
    const resultadoContainer = document.getElementById('resultadoCuotas');
    resultadoContainer.innerHTML = `
      <p>Cuota mensual a pagar: $${cuotaMensual}</p>
    `;
  };
  

  document.getElementById('botonSimular').addEventListener('click', handleSimulation);
  