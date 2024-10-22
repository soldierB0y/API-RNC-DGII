import puppeteer from 'puppeteer'



const cargarPagina= async(RNCedula)=>{

     
          try
          {
               const browser= await puppeteer.launch({ headless:true, args:['--no-sandbox','--disable-setuid-sandbox']});
               const page = await browser.newPage();
               await page.goto('https://www.dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx');
               const input= await page.type('#ctl00_cphMain_txtRNCCedula',RNCedula);
               const boton= await page.waitForSelector('#ctl00_cphMain_btnBuscarPorRNC', { visible: true });
               let contribuyente= {
                    RNCedula:'',
                    nombreRazonSocial:'',
                    nombreComercial:'',
                    categoria:'',
                    regimenPagos:'',
                    estado:'',
                    actividadEconomica:'',
                    administracionLocal:''
               };

               boton.click();
               //esto es una forma de hacerlo esperar 2 segundos antes de realizar la siguiente accion
               await new Promise(p=>setTimeout(p,2000));
               const tabla= await page.$('tbody');
               if(tabla)
               {
                    /*Recorrer cada letra en un elemento*/
                    const bodyContent= await page.evaluate(element=>element.innerHTML,tabla);

                    /*tomar RNC/Cedula*/ 
                    let posicionCedulaRNC=(bodyContent.indexOf('</td><td>')+9);
                    console.log(bodyContent);

                    for (let j=posicionCedulaRNC;j< (posicionCedulaRNC+11);j++)
                    {
                         contribuyente['RNCedula']+=bodyContent[j];
                    }
                    /*tomar nombreComercial*/
                    let posicionNombreStart= (bodyContent.indexOf('Social')+15)

                    for(let i=posicionNombreStart-1;true;i++)
                    {
                         if (bodyContent[i+1]!='<')
                         {
                              contribuyente['nombreRazonSocial']+=bodyContent[i+1];
                         }
                         else
                         {
                              console.log('valor:'+i);
                              break;
                         }
                    }

                    /*nombreComercial*/
                    let posicionNombreComercial=(bodyContent.indexOf('Comercial')+18);
                    for(let i=posicionNombreComercial-1;true;i++)
                    {
                         if (bodyContent[i+1]!='<')
                         {
                              contribuyente['nombreComercial']+=bodyContent[i+1];
                         }
                         else
                         {
                              console.log('valor:'+i);
                              break;
                         }
                    }



                    /*categoria*/
                    let posicionCategoria=(bodyContent.indexOf('Categoría')+17);
                    for(let i=posicionCategoria;true;i++)
                    {
                         if (bodyContent[i+1]!='<')
                         {
                              contribuyente['categoria']+=bodyContent[i+1];
                         }
                         else
                         {
                              console.log('valor:'+i);
                              break;
                         }
                    }

                    /*Regimen de pagos*/
                    let posicionRegimenPagos=(bodyContent.indexOf('Régimen de pagos')+24);
                    for(let i=posicionRegimenPagos;true;i++)
                    {
                         if (bodyContent[i+1]!='<')
                         {
                              contribuyente['regimenPagos']+=bodyContent[i+1];
                         }
                         else
                         {
                              console.log('valor:'+i);
                              break;
                         }
                    }
                    /*Estado */
                    let posicionEstado=(bodyContent.indexOf('Estado')+14);
                    for(let i=posicionEstado;true;i++)
                    {
                         if (bodyContent[i+1]!='<')
                         {
                              contribuyente['estado']+=bodyContent[i+1];
                         }
                         else
                         {
                              console.log('valor:'+i);
                              break;
                         }
                    }
                    /*actividad economica*/
                    let posicionActividadEconomica=(bodyContent.indexOf('Actividad Economica')+27);
                    for(let i=posicionActividadEconomica;true;i++)
                    {
                         if (bodyContent[i+1]!='<')
                         {
                              contribuyente['actividadEconomica']+=bodyContent[i+1];
                         }
                         else
                         {
                              console.log('valor:'+i);
                              break;
                         }
                    }

                    /*administracion loca*/
                    let posicionAdministracionLocal=(bodyContent.indexOf('Administracion Local')+28);
                    for(let i=posicionAdministracionLocal;true;i++)
                    {
                         if (bodyContent[i+1]!='<')
                         {
                              contribuyente['administracionLocal']+=bodyContent[i+1];
                         }
                         else
                         {
                              console.log('valor:'+i);
                              break;
                         }
                    }




               }

               /*await page.screenshot({path:'example.png'})*/
               await browser.close();
               if(contribuyente['RNCedula']=='' || contribuyente['RNCedula']==null)
               {
                    return {error:'no se han encontrado contribuyentes'}
               }
               else
               {
                    return contribuyente;
               }

          
          }
          catch(error){
               console.log(error);
               return error.toString();
          }



               


     
     
     
}

export default cargarPagina;
