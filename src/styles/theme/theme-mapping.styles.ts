import { secondaryColors } from './theme.styles';

export const themeMapping = {
	components: {
		Button: {
			meta: {
				variantGroups: {
					status: {
						secondary: {
							default: false,
						},
					},
				},
			},
			appearances: {
				filled: {
					variantGroups: {
						status: {
							secondary: {
								borderColor: secondaryColors['color-secondary-default-border'],
								backgroundColor: secondaryColors['color-secondary-default'],
								textColor: 'text-control-color',
								iconTintColor: 'text-control-color',
								state: {
									focused: {
										borderColor:
											secondaryColors['color-secondary-focus-border'],
										backgroundColor: secondaryColors['color-secondary-focus'],
									},
									hover: {
										borderColor:
											secondaryColors['color-secondary-hover-border'],
										backgroundColor: secondaryColors['color-secondary-hover'],
									},
									active: {
										borderColor:
											secondaryColors['color-secondary-active-border'],
										backgroundColor: secondaryColors['color-secondary-active'],
									},
									disabled: {
										borderColor:
											secondaryColors['color-secondary-disabled-border'],
										backgroundColor:
											secondaryColors['color-secondary-disabled'],
										textColor: 'text-disabled-color',
										iconTintColor: 'text-disabled-color',
									},
								},
							},
						},
					},
				},
				outline: {
					variantGroups: {
						status: {
							secondary: {
								borderColor:
									secondaryColors['color-secondary-transparent-default-border'],
								backgroundColor:
									secondaryColors['color-secondary-transparent-default'],
								textColor: secondaryColors['text-secondary-color'],
								iconTintColor: secondaryColors['text-secondary-color'],
								state: {
									focused: {
										borderColor:
											secondaryColors[
												'color-secondary-transparent-focus-border'
											],
										backgroundColor:
											secondaryColors['color-secondary-transparent-focus'],
										textColor: secondaryColors['text-secondary-color'],
										iconTintColor: secondaryColors['text-secondary-color'],
									},
									hover: {
										borderColor:
											secondaryColors[
												'color-secondary-transparent-hover-border'
											],
										backgroundColor:
											secondaryColors['color-secondary-transparent-hover'],
										textColor: secondaryColors['text-secondary-color'],
										iconTintColor: secondaryColors['text-secondary-color'],
									},
									active: {
										borderColor:
											secondaryColors[
												'color-secondary-transparent-active-border'
											],
										backgroundColor:
											secondaryColors['color-secondary-transparent-active'],
										textColor: secondaryColors['text-secondary-color'],
										iconTintColor: secondaryColors['text-secondary-color'],
									},
									disabled: {
										borderColor:
											secondaryColors[
												'color-secondary-transparent-disabled-border'
											],
										backgroundColor:
											secondaryColors['color-secondary-transparent-disabled'],
										textColor: 'text-disabled-color',
										iconTintColor: 'text-disabled-color',
									},
								},
							},
						},
					},
				},
				ghost: {
					variantGroups: {
						status: {
							secondary: {
								borderColor: 'transparent',
								backgroundColor: 'transparent',
								textColor: secondaryColors['text-secondary-color'],
								iconTintColor: secondaryColors['text-secondary-color'],
								state: {
									focused: {
										borderColor: 'color-basic-transparent-500',
										backgroundColor: 'color-basic-transparent-200',
										textColor: secondaryColors['text-secondary-color'],
										iconTintColor: secondaryColors['text-secondary-color'],
									},
									hover: {
										borderColor: 'transparent',
										backgroundColor: 'color-basic-transparent-100',
										textColor: secondaryColors['text-secondary-color'],
										iconTintColor: secondaryColors['text-secondary-color'],
									},
									active: {
										borderColor: 'transparent',
										backgroundColor: 'color-basic-transparent-200',
										textColor: secondaryColors['text-secondary-color'],
										iconTintColor: secondaryColors['text-secondary-color'],
									},
									disabled: {
										borderColor: 'transparent',
										backgroundColor: 'color-basic-transparent-200',
										textColor: 'text-disabled-color',
										iconTintColor: 'text-disabled-color',
									},
								},
							},
						},
					},
				},
			},
		},
	},
};
