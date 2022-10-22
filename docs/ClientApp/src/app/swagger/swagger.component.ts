import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist';

declare const SwaggerUIBundle: any;
declare const SwaggerUIStandalonePreset: any;

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.css']
})
export class SwaggerComponent implements OnInit {

  @ViewChild('swaggerui') swaggerDom: ElementRef<HTMLDivElement>;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    SwaggerUIBundle({
      urls: [
        {
          url: "https://api.solarproject.click/swagger/v1/swagger.yaml",
          name: "v1"
        },
        {
          url: "https://api.solarproject.click/swagger/v2/swagger.yaml",
          name: "v2"
        }
      ],
      "urls.primaryName": "v2",
      domNode: this.swaggerDom.nativeElement,
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      layout: 'StandaloneLayout',
    });

    document.querySelector("img").src = "estusozluklogo.png";
    document.querySelector("img").parentElement.innerHTML += "EstuSozluk - Swagger";
  }
}
