describe('udemy testes', () => {
  beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));

  it("text inputs fields ", () => {
    const firsName = "Victor"
    const lastName = "Emanuel"


    cy.get("#first-name").type(firsName)
    cy.get("#last-name").type(lastName)
    cy.get("#email").type("victor@gmail.com")
    cy.get("#requests").type("carnivoro")
    cy.get("#signature").type(`${firsName} ${lastName}`)
  })

  it("select field", () => {
    cy.get("#ticket-quantity").select("2")
  })

  it("select 'vip', ticket type", () => {
    cy.get("#vip").check()
  })

  it("select 'publication' and 'friend', then uncheck publication", () => {
    cy.get("#publication").check()
    cy.get("#friend").check()
    cy.get("#publication").uncheck()
  })

  it("has 'ticketBox' 'header's heading ", () => {
    cy.get("header h1").should("contain", "TICKETBOX")
  })

  /*it("alerts on 'invalid' email ", () => {
    cy.get("#email").type("jncdjdcnjajxjsn--gmail.com")
    cy.get("#email.invalid").should("exist")
  })*/

  it("alerts on 'invalid' email ", () => {
    cy.get("#email")
      .as("email")
      .type("victor--gmail.com")

    cy.get("#email.invalid")
      .should("exist")

    cy.get("@email")
      .clear()
      .type("victor@gmail.com")

    cy.get("#email.invalid")
      .should("not.exist")
  })

  it("fills and reset the form", () => {
    const firsName = "Victor"
    const lastName = "Emanuel"
    const fullname = `${firsName} ${lastName}`

    cy.get("#first-name").type(firsName)
    cy.get("#last-name").type(lastName)
    cy.get("#email").type("victor@gmail.com")
    cy.get("#friend").check()
    cy.get("#vip").check()
    cy.get("#requests").type("IPA Beer")
    cy.get("#ticket-quantity").select("2")


    cy.get(".agreement p").should(
      "contain",
      `I, ${fullname}, wish to buy 2 VIP tickets.`
    )
    cy.get("#agree").click()
    cy.get("#signature").type(fullname)

    cy.get("button[type='submit']")
      .as("submitButton")
      .should("not.be.disabled");

    cy.get("button[type='reset']").click()

    cy.get("@submitButton").should("be.disabled")


  })

  it("fills mandatory filds using support command", () => {
    const customer = {
      firsName: "Victor",
      lastName: "Emanuel",
      email: "victor@gmail.com"
    }
    cy.fillMandatoryFields(customer)
    cy.get("button[type='submit']")
      .as("submitButton")
      .should("not.be.disabled")

    cy.get("#agree").uncheck()

    cy.get("@submitButton").should("be.disabled")


  })

})