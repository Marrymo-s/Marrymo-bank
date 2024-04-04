package site.bank.restapi.auth.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.bank.restapi.auth.dto.common.ClientDto;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PrincipalDetails implements UserDetails {

	private ClientDto clientDto;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> collect = new ArrayList<>();
		collect.add(() -> String.valueOf(clientDto.getClientRole()));
		return collect;
	}

	@Override
	public String getPassword() {
		return clientDto.getClientSecret();
	}

	@Override
	public String getUsername() {
		return clientDto.getClientId();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
