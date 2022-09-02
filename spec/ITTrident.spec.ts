import { Ensure, includes,equals  } from '@serenity-js/assertions';
import { actorCalled, Duration} from '@serenity-js/core';
import { by, Click, Navigate, Target, Website, Enter,Wait } from '@serenity-js/webdriverio';
import { describe, it } from 'mocha';
import {isVisible,isClickable} from '@serenity-js/webdriverio/lib/expectations'

describe('ITTRIDENT Automation Testing', () => {

    const Credential = {
               Swag_UserName: "standard_user",
               SWag_Password: "secret_sauce",
           };

    const LoginButton = Target.the('Login Button').located(by.css('#login-button'))
    const UserName = Target.the('UserName Edit box').located(by.css('#user-name'))
    const Password = Target.the('Password Edit Box').located(by.css('#password'))
    const SwagLabHeader = Target.the('Home Page Header').located(by.css('#password'))
    const SwagLabBag = Target.the('Swag Lab Bag').located(by.css('#add-to-cart-sauce-labs-backpack'))
    const CartItem = Target.the('Cart Icon').located(by.css('.shopping_cart_badge'))
    const Checkout = Target.the('Checkout').located(by.css('#checkout'))
    const FirstName = Target.the('FirstName').located(by.css('#first-name'))
    const LastName = Target.the('LastName').located(by.css('#last-name'))
    const ZipCode = Target.the('ZipCode').located(by.css('#postal-code'))
    const Continue = Target.the('Continue Button').located(by.css('#continue'))
    const Finish = Target.the('Finish Button').located(by.css('#finish'))
    const BackHome = Target.the('Back To Home Button').located(by.css('#back-to-products'))

    const Page = {
            LogoExist: Target.the('Login Page Loaded').located(by.css('.login_logo')),
            ThankYou: Target.the('Thank You Page').located(by.css('.complete-header'))
            
        };


    it(`Login the Sauce demo application`, () =>
        actorCalled('Testing').attemptsTo(

            Navigate.to('https://www.saucedemo.com/'),
            Wait.until(Page.LogoExist, isVisible()),
            Ensure.that(Page.LogoExist, isVisible()),
            Enter.theValue(Credential.Swag_UserName).into(UserName),
            Enter.theValue(Credential.SWag_Password).into(Password),
            Click.on(UserName),
            Wait.until(LoginButton, isClickable()),
            Ensure.that(LoginButton, isClickable()),
            Click.on(LoginButton),
            Wait.for(Duration.ofSeconds(3)),
            Ensure.that(Website.title(), includes('Swag Labs')),
        ));

    it(`Adding the Product to cart`, () =>
        actorCalled('Add Cart').attemptsTo(
            Ensure.that(Website.title(), includes('Swag Labs')),
            Wait.until(SwagLabBag, isClickable()),
            Ensure.that(SwagLabBag, isClickable()),
             Click.on(SwagLabBag),
             Wait.until(CartItem, isClickable()),
             Ensure.that(CartItem, isClickable()),
             Click.on(CartItem),
             Wait.for(Duration.ofSeconds(3))
            
         ));

    it(`CheckOut the product`, () =>
        actorCalled('CheckOut').attemptsTo(
            Ensure.that(Website.title(), includes('Swag Labs')),
            Wait.until(Checkout, isClickable()),
            Ensure.that(Checkout, isClickable()),
            Click.on(Checkout),
            Wait.for(Duration.ofSeconds(3))
            
         ));

    it(`Fill the information and Finish the purchase`, () =>
        actorCalled('Add Cart').attemptsTo(
            Ensure.that(Website.title(), includes('Swag Labs')),
            Enter.theValue('Praveen').into(FirstName),
            Enter.theValue('Kumar').into(LastName),
            Enter.theValue('600073').into(ZipCode),
            Wait.for(Duration.ofSeconds(3)),
            Click.on(Continue)
            
        ));

    it(`Verify Thank You message post finishing the purchase`, () =>
        actorCalled('Verify  thank you message ').attemptsTo(
            Ensure.that(Website.title(), includes('Swag Labs')),
            Click.on(Finish),
            Wait.for(Duration.ofSeconds(3)),
            Wait.until(Page.ThankYou, isVisible()),
            Ensure.that(Page.ThankYou, isVisible()),
            Wait.for(Duration.ofSeconds(3)),
            Click.on(BackHome),
            Wait.for(Duration.ofSeconds(3))
           
        ));
});
