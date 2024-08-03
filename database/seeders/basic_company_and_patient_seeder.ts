import Company from '#apps/shared/models/company'
import Patient from '#apps/shared/models/patient'
import Professional from '#models/professional'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Company.firstOrCreate(
      {
        nationalCode: '340785161',
      },
      {
        id: '5836049162517872642997799',
        address: '371 Avenue Du Doyen Gaston Giraud',
        city: 'Montpellier',
        country: 'France',
        name: 'Centre Hospitalier Universitaire Lapeyronie',
        zipCode: '34295',
        email: 'contact@lapeyronie.fr',
        nationalCode: '340785161',
        phone: '0467336733',
      }
    )

    await Company.firstOrCreate(
      {
        nationalCode: '340796663',
      },
      {
        id: '9336049162517872642997616',
        address: '371 Avenue Du Doyen Gaston Giraud',
        city: 'Montpellier',
        country: 'France',
        name: 'HOPITAL ARNAUD DE VILLENEUVE',
        zipCode: '34295',
        phone: '04 67 33 67 33',
        nationalCode: '340796663',
      }
    )

    await Patient.firstOrCreate(
      {
        oidcId: 'df6813f5-1585-40da-af91-194c1b89c979',
        id: '9498994932837253124945211',
      },
      {
        id: '9498994932837253124945211',
        name: 'Nathael',
        oidcId: 'df6813f5-1585-40da-af91-194c1b89c979',
        dateOfBirth: DateTime.fromISO('2003-07-05'),
      }
    )

    await Patient.firstOrCreate(
      {
        oidcId: 'f875c155-9607-4aa3-af4e-59b3bff848ff',
        id: '7225613526272839680',
      },
      {
        id: '7225613526272839680',
        name: 'Patient test[1]',
        oidcId: 'f875c155-9607-4aa3-af4e-59b3bff848ff',
        dateOfBirth: DateTime.fromISO('2004-10-23'),
      }
    )

    await Professional.firstOrCreate(
      {
        oidcId: 'b48b178d-1ed5-46b1-8379-9d9f80b3c75b',
      },
      {
        name: 'Jinane',
        companyId: '5836049162517872642997799',
        licenceNumber: '3723719331',
        oidcId: 'b48b178d-1ed5-46b1-8379-9d9f80b3c75b',
        speciality: 'diabetic',
      }
    )

    await Professional.firstOrCreate(
      {
        oidcId: 'c8d2fd2c-5c40-4e52-af58-134b7c8df323',
      },
      {
        oidcId: 'c8d2fd2c-5c40-4e52-af58-134b7c8df323',
        name: 'Medecin Test',
        speciality: 'generalist',
        licenceNumber: '123131313',
      }
    )
  }
}
