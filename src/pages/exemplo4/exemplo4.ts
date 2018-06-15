import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

/**
 * https://developers.google.com/maps/documentation/javascript/directions
 */
@IonicPage()
@Component({
  selector: 'page-exemplo4',
  templateUrl: 'exemplo4.html',
})
export class Exemplo4Page {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map: any;
  //inicia o mapa na ETEC
  startPosition = new google.maps.LatLng(-23.552994,-46.399617);
  originPosition: string;
  destinationPosition: string;
  localAtual: string;

  ionViewDidLoad() {
    this.initializeMap();
  }
  
  constructor(private geolocation: Geolocation) { }
  
  pegarLocalizacao(){
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      this.originPosition = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      //troca a posiinicial inicia do mapa para a localização atual
      this.startPosition = this.originPosition;
      
      this.initializeMap();

    }).catch((error) => {
      console.log('Erro ao recuperar sua posição', error);
    });
  }
  
  initializeMap() {
    const mapOptions = {
      zoom: 17,
      center: this.startPosition,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.directionsDisplay.setMap(this.map);

    const marker = new google.maps.Marker({
      position: this.startPosition,
      map: this.map,
    });
  }

  calculateRoute() {
    if (this.destinationPosition && this.originPosition) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.originPosition,
        destination: this.destinationPosition,
        travelMode: 'DRIVING'
      };
      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }
}
