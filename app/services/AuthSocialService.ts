import HttpContextService from "./HttpContextService";
import { SocialProviders, GoogleDriverContract } from "@ioc:Adonis/Addons/Ally";
import User from "App/Models/User";

export default class AuthSocialService extends HttpContextService {
    public async getUser(socialProvider: keyof SocialProviders) {
        const social = this.ctx.ally.use(socialProvider);

        if (!this.checkForErrors(social)) {
            return { isSuccess: false, user: null }; // Return null instead of empty string
        }

        const user = await this.findOrCreateUser(social, socialProvider);
        return { isSuccess: true, user };
    }

    private checkForErrors(social: GoogleDriverContract) {
        if (social.accessDenied()) {
            this.ctx.session.flash('error', 'Access was denied!');
            return false;
        }

        if (social.stateMisMatch()) {
            this.ctx.session.flash('error', 'Session expired!');
            return false;
        }

        if (social.hasError()) {
            this.ctx.session.flash('error', social.getError() ?? "An unexpected error occurred");
            return false;
        }

        return true;
    }

    private async findOrCreateUser(social: GoogleDriverContract, socialProvider: keyof SocialProviders) {
        const user = await social.user();
        const tokenKey = `${socialProvider}AccessToken`;

        let existingUser = await User.query()
            .where('email', user.email!)
            .whereNotNull(tokenKey)
            .first();

        if (!existingUser) {
            // Create new user if not found
            existingUser = await User.create({
                name: user.name ?? '', // Handle cases where user.name might be null
                email: user.email!,
                [tokenKey]: user.token.token,
            });
        }

        return existingUser;
    }
}
