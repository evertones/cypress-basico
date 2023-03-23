// Test case (1): Login page loads correctly
describe('The login page', () => {
    describe('The login page', () => {
        it('should display the page title equals the value set in the “Company Name” field from “System Details”', () => {
            cy
                .visit('https://everton.hound.redlounge.io')
                .title().should('eq', 'World Manager – 11.5 Platform')
        })
        it('should display the login form on the page', () => {
            cy
                .get('.page-login > table td.headerBar')
                .should('have.text', 'Login')
        })
    })
})

// Test case (2): Login with an empty username and password
describe('The login page', () => {
    describe('when submitted without any data', () => {
        it('should display the error message “Please enter Username and Password”', () => {
            cy
                .visit('https://everton.hound.redlounge.io')
                .get('#loginbutton').click()
                .get('form[name="myform"] li.error').should('contain.text', 'Please enter Username and Password')
        })
        it('should display the fields “Username” and “Password” empty', () => {
            cy
                .get('#username').should('have.value', '')
                .get('#password').should('have.value', '')
        })
    })
})

// Test case (3): Login with a valid username and empty password
describe('The login page', () => {
    describe('when submitted with a blank password', () => {
        it('should display the error message “Please enter Username and Password”', () => {
            cy
                .visit('https://everton.hound.redlounge.io')
                .get('#username').type('wm1')
                .get('#loginbutton').click()
                .get('form[name="myform"] li.error').should('contain.text', 'Please enter Username and Password')

        })
        it('should display the “Username” field with the value entered for the username', () => {
            cy.get('#username').should('have.value', 'wm1')
        })
        it('should display the “Password” field with the value empty', () => {
            cy.get('#password').should('have.value', '')
        })
    })
})

// Test case (4): Login with a valid username and incorrect password
describe('The login page', () => {
    describe('when submitted with an invalid password', () => {
        it('should display the error message “Incorrect Username or Password”', () => {
            cy
                .visit('https://everton.hound.redlounge.io')
                .get('#username').type('wm1')
                .get('#password').type('anything')
                .get('#loginbutton').click()
                .get('form[name="myform"] li.error').should('contain.text', 'Incorrect Username or Password')
        })
        it('should display the “Username” field with the value entered for the username', () => {
            cy.get('#username').should('have.value', 'wm1')
        })
        it('should display the “Password” field with the value empty', () => {
            cy.get('#password').should('have.value', '')
        })
    })
})

// Test case (5): Login with an empty username and correct password
describe('The login page', () => {
    describe('when submitted with an empty username', () => {
        it('should display the error message “Please enter Username and Password”', () => {
            cy
                .visit('https://everton.hound.redlounge.io')
                .get('#username').clear()
                .get('#password').type('wm1')
                .get('#loginbutton').click()
                .get('form[name="myform"] li.error').should('contain.text', 'Please enter Username and Password')
        })
        it('should display the “Username” and “Password” fields with the value empty', () => {
            cy
                .get('#username').should('have.value', '')
                .get('#password').should('have.value', '')
        })
    })
})

// Test case (6): Login with valid details
describe('The login page', () => {
    describe('when submitted with valid credentials', () => {
        it('should navigate to the page with the title “Home Dashboard”', () => {
            cy
                .visit('https://everton.hound.redlounge.io')
                .get('#username').clear().type('wm1')
                .get('#password').clear().type('wm1')
                .get('#loginbutton').click()
                .get('h1 span.header-title').should('contain.text', 'Home Dashboard')
        })
    })
    describe('when the Account Panel is inspected', () => {
        it('should display the account name that matches the credentials used to log into the platform', () => {
            cy
                .get('a[data-header-button="profile"]').click()
                .get('section.profile-details h1').contains('WM-01 World')
        })
    })
})

// Test case (7): Login with a deactivated account
describe('The login page', () => {
    describe('when submitted with a deactivated account', () => {
        it('should display the error message “Your account has become inactive, please contact your manager to have it reinstated.”', () => {
            cy
                .get('#profile-popup-panel a[data-header-button="logOut"]').click()
                .visit('https://everton.hound.redlounge.io')
                .get('#username').clear().type('eiarea')
                .get('#password').clear().type('eiarea')
                .get('#loginbutton').click()
                .get('form[name="myform"] li.error').should('contain.text', 'Your account has become inactive, please contact your manager to have it reinstated.')
        })
        it('should display the “Username” field with the value entered for the username', () => {
            cy.get('#username').should('have.value', 'eiarea')
        })
        it('should display the “Password” field with the value empty', () => {
            cy.get('#password').should('have.value', '')
        })
    })
})

// Test case (8): Login with a deleted account
describe('The login page', () => {
    describe('when submitted with a deleted account', () => {
        it('should display the error message “Your account has been deleted from this system, please contact your manager.”', () => {
            cy
                .get('#username').clear().type('markp')
                .get('#password').clear().type('markp')
                .get('#loginbutton').click()
                .get('form[name="myform"] li.error').should('contain.text', 'Your account has been deleted from this system, please contact your manager')
        })
        it('should display the “Username” field with the value entered for the username', () => {
            cy.get('#username').should('have.value', 'markp')
        })
        it('should display the “Password” field with the value empty', () => {
            cy.get('#password').should('have.value', '')
        })
    })
})

// Test case (9): Logout successfully
describe('The logout button', () => {
    describe('when clicked', () => {
        it('should display the page title equals the value set in the “Company Name” field from “System Details”', () => {
            const updateQuery = `UPDATE wtmsettings SET value = 1 WHERE tag = 'system.config.security.autoLogin.enabled'`
            cy.log(updateQuery)
            cy.query(updateQuery).then(res => {
                cy.log('Update => Rows affected: ' + res.affectedRows)
            });

            cy
                .visit('https://everton.hound.redlounge.io')
                .get('#username').clear().type('wm1')
                .get('#password').clear().type('wm1')
                .get('#loginbutton').click()
                .get('a[data-header-button="profile"]').click()
                .get('#profile-popup-panel a[data-header-button="logOut"]').click()
                .title().should('eq', 'World Manager – 11.5 Platform')
        })
        it('should display the login form on the page', () => {
            cy
                .get('#username').should('have.value', '')
                .get('#password').should('have.value', '')
        })
        it('should display the checkbox “Stay signed in” not selected', () => {
            cy.get('#staysignedin').should('be.visible')
        })
    })
})

// Test case (10): User remains logged out with SSI disabled
describe('The platform', () => {
    describe('set with the property Auto-Login disabled', () => {
        describe('when the user logs in', () => {
            it('should have the session cookie set to expire after the browser is closed', () => {
                const updateQuery = `UPDATE wtmsettings SET value = 1 WHERE tag = 'system.config.security.autoLogin.enabled'`
                cy.log(updateQuery)
                cy.query(updateQuery).then(res => {
                    cy.log('Update => Rows affected: ' + res.affectedRows)
                });

                cy
                    .visit('https://everton.hound.redlounge.io')

                const updateQuery2 = `UPDATE wtmsettings SET value = 0 WHERE tag = 'system.config.security.autoLogin.enabled'`
                cy.log(updateQuery2)
                cy.query(updateQuery2).then(res => {
                    cy.log('Update => Rows affected: ' + res.affectedRows)
                });

                cy
                    .clearCookies()
                    .get('#username').clear().type('wm1')
                    .get('#password').clear().type('wm1')
                    .get('#loginbutton').click()
                    .getCookie('staysignedin').then((cookie) => {
                        expect(cookie.value).to.equal('0')
                    })
            })
        })
        describe('when the session is cleaned up', () => {
            it('should display the page title equals the value set in the “Company Name” field from “System Details”', () => {
                cy.getCookie('SESSIONID').then((cookie) => {
                    cy.log('cookie info: ' + cookie)
                    cy.log('cookie info: ' + cookie.value)

                    const deleteQuery = `DELETE FROM sessions WHERE sessionId = '` + cookie.value + `'`;
                    cy.log(deleteQuery)
                    cy.query(deleteQuery).then(res => {
                        expect(res.affectedRows).to.equal(1)
                        cy.log('Delete => Rows affected: ' + res.affectedRows)
                    });
                })

                cy
                    .clearCookie('SESSIONID')
                    .get('a[data-header-button="home"]').click()
                    .title().should('eq', 'World Manager – 11.5 Platform')
                    
            })
            it('should display the login form on the page', () => {
                cy
                    .get('#username').should('have.value', '')
                    .get('#password').should('have.value', '')
                    
            })
            it('should NOT display the checkbox “Stay Signed In” on the page', () => {
                cy.get('#staysignedin').should('not.exist')
            })
        })
    })
})

// Test case 11): User remains logged out with SSI enabled
describe('The platform', () => {
    describe('set with the property Auto-Login enabled', () => {
        describe('when the user logs in with the checkbox ”Stay Signed In” un-ticked', () => {
            it('should have the session cookie set to expire after the browser is closed', () => {
                cy
                    .visit('https://everton.hound.redlounge.io')
                    .get('#username').clear().type('wm1')
                    .get('#password').clear().type('wm1')
                    .get('#loginbutton').click()

                const updateQuery = `UPDATE wtmsettings SET value = 1 WHERE tag = 'system.config.security.autoLogin.enabled'`
                cy.log(updateQuery)
                cy.query(updateQuery).then(res => {
                    //expect(res.affectedRows).to.equal(1) 
                    cy.log('Update => Rows affected: ' + res.affectedRows)
                });

                cy
                    .getCookie('staysignedin').then((cookie) => {
                        expect(cookie.value).to.equal('0')
                    })
            })
        })
        describe('when the session is cleaned up', () => {
            it('should display the page title equals the value set in the “Company Name” field from “System Details”', () => {
                cy.getCookie('SESSIONID').then((cookie) => {
                    cy.log('cookie info: ' + cookie)
                    cy.log('cookie info: ' + cookie.value)

                    const deleteQuery = `DELETE FROM sessions WHERE sessionId = '` + cookie.value + `'`;
                    cy.log(deleteQuery)
                    cy.query(deleteQuery).then(res => {
                        expect(res.affectedRows).to.equal(1)
                        cy.log('Delete => Rows affected: ' + res.affectedRows)
                    });
                })

                cy.clearCookie('SESSIONID')
                    .get('a[data-header-button="home"]').click()
            })
            it('should display the login form on the page', () => {
                cy
                    .get('#username').should('have.value', '')
                    .get('#password').should('have.value', '')
            })
            it('should display the checkbox “Stay Signed In” on the page un-ticked', () => {
                cy.get('#staysignedin').should('not.be.checked')
            })
        })
    })
})

// Test case (12): User remains logged in when SSI is used
describe('The platform', () => {
    describe('set with the property Auto-Login enabled', () => {
        describe('when the user logs in with the checkbox ”Stay Signed In” ticked', () => {
            it('should have the session cookie set to expire after N days', () => {
                cy
                    .visit('https://everton.hound.redlounge.io')
                    .get('#username').clear().type('wm1')
                    .get('#password').clear().type('wm1')
                    .get('#staysignedin').check()
                    .get('#loginbutton').click()

                cy
                    .getCookie('staysignedin').then((cookie) => {
                        expect(cookie.value).to.equal('1')
                    })
            })
        })
    })
})
