async function handleOnboardingSubmit() {
    setDisableButton(true)
    let payload = {
        _id: session.session?.identity.id,
        given_name: userData.legalFirstName.trim() + " " + userData.legalMiddleName.trim(),
        family_name: userData.legalLastName,
        tax_id_type: userData.idType,
        country_of_citizenship: getISO3FromCountry(userData.citizenship),
        country_of_birth: getISO3FromCountry(userData.birthCountry),
        country_of_tax_residence: getISO3FromCountry(userData.taxResidence),
        dob:  formatDate(new Date(userData.dob)),
        tax_id: userData.idNumber,
        funding_source: fund_source_map[userData.sourceOfFunds],//userData.sourceOfFunds?.toLowerCase(),
        annual_income_max: userData.annualHouseholdIncome,
        liquid_net_worth_max: userData.investibleAssets,
        id_number: userData.idNumber,
        street_address_1: userData.homeAddress1,
        street_address_2: userData.homeAddress2,
        city: userData.city,
        state: userData.state,
        postal_code: userData.zipCode,
        province: userData.state,
        country: getISO3FromCountry(userData.addressCountry),
        employment_status: userData.employmentStatus,
        employer_name: userData.employerName,
        employer_address: userData.employerAddress,
        employment_position: userData.jobTitle,
        preference: userData.fundPreference === 'Islamic' ? "islamic" : 'conventional',
        risk_tolerance_level : userData.riskTolerance,
        permanent_resident : userData.isUSPR,
        visa_type : userData.visaType != "" ? userData.visaType : null,
        visa_expiration_date : (userData.visaExpirationDate != "") ? formatDate(new Date(userData.visaExpirationDate)) : null, 

        bank_details: {
            bank_name: userData.bankName,
            bank_account_number: userData.bankAccountNumber,
            routing_number: userData.routingNumber
        },
        trusted_contact: {
            given_name: userData.trustedContactName,
            family_name: userData.trustedContactLastName,
            email_address: userData.trustedContactEmail,
            phone_number: userData.trustedContactNumber
        },
        disclosures: {
            is_control_person: userData.isExecutiveOrShareholderPC,
            is_affiliated_exchange_or_finra: userData.isUSBrokerAffiliated,
            is_politically_exposed: userData.isSeniorPoliticalFigure,
            is_us_resident : userData.isUSResident,
            is_us_citizen : userData.isUSCitizen,
            is_uspr : userData.isUSPR,
            immediate_family_exposed: userData.isRelatedToPoliticalFigure,
            context: [] as any
        },

    }

    if (userData.isExecutiveOrShareholderPC) {
        payload.disclosures.context.push({
            context_type : "CONTROLLED_FIRM",
            company_name : userData.publicCompanyName,
            company_street_address : userData.publicCompanyAddress,
            company_city : userData.publicCompanyCity,
            company_state : userData.publicCompanyState,
            company_country : userData.publicCompanyCountry,
            company_compliance_email : userData.publicCompanyEmail
        })
    }

    if(userData.isUSBrokerAffiliated) {
        payload.disclosures.context.push({
            context_type : "AFFILIATE_FIRM",
            company_name : userData.brokerRegulatorName,
            company_street_address : userData.brokerRegulatorAddress,
            company_city : "",//append user object ....
            company_state : "",
            company_country : "",
            company_compliance_email : userData.brokerRegulatorEmail
        })
    }

    if(userData.isPEP) {
        //TODO
    }

    if(userData.isRelatedToPoliticalFigure) {
        payload.disclosures.context.push({
            context_type : "IMMEDIATE_FAMILY_EXPOSED",
            given_name : userData.relatedPEPName.split(" ")[0],
            family_name : userData.relatedPEPName.split(" ")[1] ? userData.relatedPEPName.split(" ")[1] : "",
            relation : userData.relatedPEPRelation,
            employment_position : userData.relatedPEPJobTitle
        })
    }
    // console.log(JSON.stringify(payload, null, 2))
    // console.log(userData.idType === 'USA_SSN' ? 'identity_verification' : 'tax_id_verification')
    
    // console.log("file:///" + userData.photoIDFront.uri.split("file:/").join(""))
    // console.log(userData.photoIDFront.uri)
    // return


    const res = await UserService.createUser(payload)


    const photoIdFrontUploadBody = new FormData()
    photoIdFrontUploadBody.append("sub_type","photoIdFront")
    photoIdFrontUploadBody.append('document', {
        uri: userData.photoIDFront.uri,
        type: 'image/jpeg',
        name: 'pid_front.jpg'
        });
    let doc_upload_1 = UserService.uploadSingleDocument(payload._id,userData.idType === 'USA_SSN' ? 'identity_verification' : 'tax_id_verification',photoIdFrontUploadBody)
    
    const bankStatementBody = new FormData()
    bankStatementBody.append("sub_type","bank-statement")
    bankStatementBody.append('document', {
        uri:  userData.bankStatement.uri,
        type: 'application/pdf',
        name: 'document.pdf'
        });
    let doc_upload_2 = UserService.uploadSingleDocument(payload._id,'address_verification',bankStatementBody)
    let doc_upload_3;
    if (userData.photoIDBack){
        const photoIdBackUploadBody = new FormData()
        photoIdBackUploadBody.append("sub_type","photoIdBack")
        photoIdBackUploadBody.append('document', {
            uri: userData.photoIDBack.uri,
            type: 'image/jpeg',
            name: 'pid_back.jpg'
            });
        doc_upload_3 = UserService.uploadSingleDocument(payload._id,userData.idType === 'USA_SSN' ? 'identity_verification' : 'tax_id_verification',photoIdBackUploadBody)
    }
    await doc_upload_1
    await doc_upload_2
    await doc_upload_3


    await UserService.agreements((payload._id as string), [
        {
            "agreement": "margin_agreement",
            "signed_at": new Date().toISOString(),
            "ip_address": IP
        },
        {
            "agreement": "account_agreement",
            "signed_at": new Date().toISOString(),
            "ip_address": IP
        },
        {
            "agreement": "customer_agreement",
            "signed_at": new Date().toISOString(),
            "ip_address": IP
        }
    ])
    let account_details;
    for (let i = 0; i < 5; i++) {
        try {
            account_details = await AlpacaService.getAccountId(session.session?.identity.traits.email)
            break
        }catch (e){
            await new Promise((resolve, reject) => setTimeout(resolve,1000))
        }
    }
    if (account_details.status === "ONBOARDING"){
        navigation.navigate("Onfido Screen",{
            account_details
        })
    }else{
        setLocationState(locationState-1)
    }
}